const should = require('should')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const config = require('../../conf/config')
config.mongoDatabase = 'testMongo'

const models = require('../../model/mongo')
const data = require('../data')
const actions = require('../../mongoRest/actions')(models.post)

const model = models.post
const testData = data.post

describe('  RESTful TEST', () => {
  before(async () => {
    await model.remove({})
    console.log('      Models Dropped')
  })

  describe(`Model:${model.modelName.toUpperCase()}`, () => {
    it('should count 0', (done) => {
      actions.findAll({
        request: {
          query: {
            count: 1
          }
        }
      }).then(body => {
        should.deepEqual(body, 0)
      }).then(done).catch(done)
    })

    it('should create doc', (done) => {
      actions.create({
        request: {
          body: testData.create
        }
      }).then(body => {
        body = body.toJSON()
        delete body.__v
        delete body._id
        // console.log(body)
        should.deepEqual(body, testData.create)
      }).then(done).catch(done)
    })

    it('should count 1', (done) => {
      actions.findAll({
        request: {
          query: {
            count: 1
          }
        }
      }).then(body => {
        should.deepEqual(body, 1)
      }).then(done).catch(done)
    })

    it('should throw error when model is wrong', async () => {
      const testModel = models[model.modelName + 'ErrorTest']
      try {
        testModel.findAll({})
      } catch (err) {
        should.deepEqual(err instanceof Error, true)
      }
    })

    it('should doc updated', async () => {
      const data = await actions.findAll({
        request: {
          query: {}
        }
      })
      should.deepEqual(data.length, 1)
      const body = (await actions.updateById({
        params: {
          id: data[0]._id
        },
        request: {
          body: testData.patch
        }
      })).toJSON()
      delete body.__v
      delete body._id
      should.deepEqual(body, Object.assign({}, testData.create, testData.patch))
    })

    it('should find all and count 2', async () => {
      const body = (await actions.create({
        request: {
          body: testData.create
        }
      })).toJSON()
      delete body.__v
      delete body._id
      should.deepEqual(body, testData.create)
      const data = await actions.findAll({
        request: {
          query: {}
        }
      })
      should.deepEqual(data.length, 2)
    })

    it('should count 0 when conditions is wrong', async () => {
      try {
        const body = await actions.findAll({
          request: {
            query: {
              conditions: 'testError'
            }
          }
        })
      } catch (err) {
        should.deepEqual(err instanceof Error, true)
      }
    })

    it('should select fields', async () => {
      const data = await actions.findAll({
        request: {
          query: {
            select: JSON.stringify(testData.select)
          }
        }
      })
      should.deepEqual(data.length, 2)
      for (const item of data) {
        should.deepEqual(Object.keys(item.toJSON()), Object.keys(testData.select).filter(name => name !== '_id'))
      }
    })

    it('should query by conditions', async () => {
      const data = await actions.findAll({
        request: {
          query: {
            conditions: JSON.stringify(testData.patch)
          }
        }
      })
      should.deepEqual(data.length, 1)
      Object.keys(testData.patch).forEach(key => {
        should.deepEqual(data[0][key], testData.patch[key])
      })
    })

    it('should filter by limit', async () => {
      const data = await actions.findAll({
        request: {
          query: {
            limit: 1
          }
        }
      })
      should.deepEqual(data.length, 1)
    })

    it('should sort by status', async () => {
      const data = await actions.findAll({
        request: {
          query: {
            sort: JSON.stringify(testData.patch),
            select: JSON.stringify(testData.patch)
          }
        }
      })
      should.deepEqual(data.length, 2)
      const sortedByHand = data.map(item => item.toJSON()).sort((a, b) => {
        const field = Object.keys(testData.patch)[0]
        return a[field] - b[field]
      })
      should.deepEqual(sortedByHand, data.map(item => item.toJSON()))
    })

    it('should skip by 1', async () => {
      const data = await actions.findAll({
        request: {
          query: {
            skip: 1,
            select: JSON.stringify(testData.patch)
          }
        }
      })
      should.deepEqual(data.length, 1)
    })
  })
})
