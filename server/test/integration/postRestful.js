const should = require('should')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const config = require('../../conf/config')
config.mongoDatabase = 'testMongo'

const models = require('../../model/mongo')
const data = require('../data')

const model = models.post
const testData = data.post
const arr = Object.keys(models).map(name => models[name])
const axios = require('axios')

let token = ''
let user = {}
const getToken = () => token

axios.interceptors.request.use((config) => {
  const token = getToken()

  if (config.ignore === true) return config

  if (config.method === 'get' && config.url.indexOf('/api/user') === -1) {
    return config
  }

  if (token !== null && typeof token !== 'undefined') {
    config.headers['authorization'] = token
  }

  return config
}, (error) => Promise.reject(error))

const actions = {
  findAll: async({ request }) => {
    return axios.get('http://localhost:3000/api/post', {
      params: request.query
    }).then(res => res.data)
  },
  create: async({ request }) => {
    return axios.post('http://localhost:3000/api/post', request.body).then(res => res.data)
  },
  updateById: async({ params, request }) => {
    return axios.patch('http://localhost:3000/api/post/' + params.id, request.body).then(res => res.data)
  },
  getToken: async(body) => {
    return axios.post('http://localhost:3000/admin/login', body).then(res => res.data)
  }
}

describe('  RESTful TEST', () => {
  before(async function() {
    this.timeout(5000)
    for (const model of arr) {
      await model.remove({})
    }
    require('../../entry.js')
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 2000)
    })
    user = (await models.user.findOne()).toJSON()
    delete user._id
    delete user.__v
    const json = await actions.getToken({
      name: user.name,
      password: user.password
    })
    token = json.token
    console.log('      Models Dropped and Server Started')
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
        // body = body.toJSON()
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
      const body = await actions.updateById({
        params: {
          id: data[0]._id
        },
        request: {
          body: testData.patch
        }
      })
      delete body.__v
      delete body._id
      should.deepEqual(body, Object.assign({}, testData.create, testData.patch))
    })

    it('should find all and count 2', async () => {
      const body = await actions.create({
        request: {
          body: testData.create
        }
      })
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
        should.deepEqual(Object.keys(item), Object.keys(testData.select).filter(name => name !== '_id'))
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
      const sortedByHand = data.map(item => item).sort((a, b) => {
        const field = Object.keys(testData.patch)[0]
        return a[field] - b[field]
      })
      should.deepEqual(sortedByHand, data.map(item => item))
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


    it('should notify token not found when query user', async () => {
      const body = await axios.get('http://localhost:3000/api/user', { ignore: true })
      // console.log(body)
      should.deepEqual(body.data, {
        status: 'fail', description: 'Token not found'
      })
    })


    it('should query user successful when provided token', async () => {
      const body = await axios.get('http://localhost:3000/api/user')
      // console.log(body)
      should.deepEqual(body.data.length, 1)
      const data = body.data[0]
      delete data._id
      delete data.__v
      should.deepEqual(data, user)
    })


    it('should notify token not found when getting picture uploading token', async () => {
      const body = await axios.post('http://localhost:3000/admin/qiniu', {
        key: 'test'
      }, { ignore: true })
      // console.log(body)
      should.deepEqual(body.data, {
        status: 'fail', description: 'Token not found'
      })
    })


    it('should get picture uploading token successful', async () => {
      const { data } = await axios.post('http://localhost:3000/admin/qiniu', {
        key: 'test'
      })
      should.deepEqual(data.upToken.length !== 0, true)
    })
  })
})
