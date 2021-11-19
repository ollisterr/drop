/**
 * Generated by orval v6.3.0 🍺
 * Do not edit manually.
 * Swagger Petstore
 * OpenAPI spec version: 1.0.0
 */
import {
  rest
} from 'msw'
import faker from 'faker'
import type {
  Pets
} from '.././model'

export const getListPetsMock = () => ([...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({id: faker.datatype.number(), name: faker.random.word(), tag: faker.helpers.randomize([faker.random.word(), undefined])})))

export const getShowPetByIdMock = () => ([...Array(faker.datatype.number({min: 1, max: 10}))].map(() => ({id: faker.datatype.number(), name: faker.random.word(), tag: faker.helpers.randomize([faker.random.word(), undefined])})))

export const getPetsMSW = () => [
rest.get('*/pets', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getListPetsMock()),
        )
      }),rest.post('*/pets', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
        )
      }),rest.get('*/pets/:petId', (req, res, ctx) => {
        return res(
          ctx.delay(1000),
          ctx.status(200, 'Mocked status'),
ctx.json(getShowPetByIdMock()),
        )
      }),]
