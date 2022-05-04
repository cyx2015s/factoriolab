import { Mocks } from 'src/tests';
import { Column, Game, LinkValue, Rational } from '~/models';
import { initialColumnsState } from './preferences.reducer';
import * as Selectors from './preferences.selectors';

describe('Preferences Selectors', () => {
  describe('Base selector functions', () => {
    it('should get slices of state', () => {
      expect(Selectors.getStates.projector(Mocks.PreferencesState)).toEqual(
        Mocks.PreferencesState.states
      );
    });
  });

  describe('getColumnsState', () => {
    it('should override Overclock for Factorio', () => {
      const state = initialColumnsState;
      const result = Selectors.getColumnsState.projector(state, Game.Factorio);
      expect(result[Column.Wagons].show).toBeTrue();
      expect(result[Column.Overclock].show).toBeFalse();
      expect(result[Column.Beacons].show).toBeTrue();
      expect(result[Column.Pollution].show).toBeTrue();
    });

    it('should override Wagons/Beacons/Pollution for Dyson Sphere Program', () => {
      const state = initialColumnsState;
      const result = Selectors.getColumnsState.projector(
        state,
        Game.DysonSphereProgram
      );
      expect(result[Column.Wagons].show).toBeFalse();
      expect(result[Column.Overclock].show).toBeFalse();
      expect(result[Column.Beacons].show).toBeFalse();
      expect(result[Column.Pollution].show).toBeFalse();
    });

    it('should override Beacons/Pollution for Satisfactory', () => {
      const state = initialColumnsState;
      const result = Selectors.getColumnsState.projector(
        state,
        Game.Satisfactory
      );
      expect(result[Column.Wagons].show).toBeTrue();
      expect(result[Column.Overclock].show).toBeTrue();
      expect(result[Column.Beacons].show).toBeFalse();
      expect(result[Column.Pollution].show).toBeFalse();
    });
  });

  describe('getLinkPrecision', () => {
    it('should return null for non-column', () => {
      const result = Selectors.getLinkPrecision.projector(LinkValue.None, null);
      expect(result).toBeNull();
    });

    it('should return items column precision', () => {
      const result = Selectors.getLinkPrecision.projector(LinkValue.Items, {
        [Column.Items]: { precision: 1 },
      });
      expect(result).toEqual(1);
    });

    it('should return belts column precision', () => {
      const result = Selectors.getLinkPrecision.projector(LinkValue.Belts, {
        [Column.Belts]: { precision: 1 },
      });
      expect(result).toEqual(1);
    });

    it('should return wagons column precision', () => {
      const result = Selectors.getLinkPrecision.projector(LinkValue.Wagons, {
        [Column.Wagons]: { precision: 1 },
      });
      expect(result).toEqual(1);
    });

    it('should return factories column precision', () => {
      const result = Selectors.getLinkPrecision.projector(LinkValue.Factories, {
        [Column.Factories]: { precision: 1 },
      });
      expect(result).toEqual(1);
    });
  });

  describe('getSimplexModifiers', () => {
    it('should create an object to be used by simplex calcs', () => {
      const result = Selectors.getSimplexModifiers.projector(
        true,
        Rational.one,
        Rational.one
      );
      expect(result).toEqual({
        simplex: true,
        costInput: Rational.one,
        costIgnored: Rational.one,
      });
    });
  });

  describe('getSavedStates', () => {
    it('should map saved states to an array of id-only options', () => {
      const result = Selectors.getSavedStates.projector({ ['id']: 'url' });
      expect(result).toEqual([{ id: 'id', name: 'id' }]);
    });
  });

  describe('getColumnsVisible', () => {
    it('should get the number of visible columns', () => {
      const result = Selectors.getColumnsVisible.projector(
        Mocks.PreferencesState.columns
      );
      expect(result).toEqual(10);
    });
  });
});
