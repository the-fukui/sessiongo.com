import {
  field,
  fieldExpectedResults,
  jamesJoyce,
  jamesJoyceExpectedResults,
  kiwi,
  kiwiExpectedResults,
  mcNeills,
  mcNeillsExpectedResults,
} from '@web/features/event/tests/placeTestData'
import {
  getPlaceAddress,
  getPlaceName,
} from '@web/features/event/utils/googleMap'

import { describe, expect, it } from 'vitest'

describe('googleMap', () => {
  describe('getPlaceName', () => {
    it('場所名を取得できる', () => {
      expect(getPlaceName(field)).toEqual(fieldExpectedResults.placeName)
      expect(getPlaceName(kiwi)).toEqual(kiwiExpectedResults.placeName)
      expect(getPlaceName(mcNeills)).toEqual(mcNeillsExpectedResults.placeName)
      expect(getPlaceName(jamesJoyce)).toEqual(
        jamesJoyceExpectedResults.placeName,
      )
    })
  })

  describe('getPlaceAddress', () => {
    it('住所（国名・郵便番号を除く）を取得できる', () => {
      expect(getPlaceAddress(field)).toEqual(fieldExpectedResults.placeAddress)
      expect(getPlaceAddress(kiwi)).toEqual(kiwiExpectedResults.placeAddress)
      expect(getPlaceAddress(mcNeills)).toEqual(
        mcNeillsExpectedResults.placeAddress,
      )
      expect(getPlaceAddress(jamesJoyce)).toEqual(
        jamesJoyceExpectedResults.placeAddress,
      )
    })
  })
})
