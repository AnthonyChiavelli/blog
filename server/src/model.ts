import { _database } from 'database'
import { FindOneOptions, ObjectId } from 'mongodb'

class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

type IFieldType = StringConstructor | NumberConstructor | DateConstructor | BooleanConstructor
interface IFieldSpec {
  type: IFieldType
  default?: any
  optional?: boolean
}

interface ISchemaSpec {
  [fieldName: string]: ISchemaSpec | IFieldSpec | IFieldType
}

class Schema {
  schema: ISchemaSpec
  _validationErrors: string[] = []

  static _isPrimitiveConstructor(val: any) {
    return ([String, Number, Boolean] as any[]).includes(val)
  }

  constructor(schema: ISchemaSpec) {
    this.schema = schema
  }

  validate(obj: { [k: string]: any }) {
    Object.entries(this.schema).forEach(([name, def]) => {
      try {
        const isOptionalField = typeof def === 'object' && def.optional == true
        if (!(name in obj)) {
          if (!isOptionalField) throw new ValidationError(`Required field '${name} missing`)
          else {
            if (typeof def === 'object' && def.default !== undefined) {
              obj[name] = def.default
            }
          }
        }

        const val = obj[name]
        const type = typeof def === 'object' ? def.type : def

        if (Schema._isPrimitiveConstructor(type) && typeof type === 'function') {
          // eslint-disable-next-line @typescript-eslint/ban-types
          const valueHasValidType = typeof val === typeof (type as Function)()
          if (!valueHasValidType) {
            throw new ValidationError(`Invalid type for field '${name}': ${val}`)
          }
        } else {
          throw new Error('Not implemented')
        }
      } catch (e) {
        if (e instanceof ValidationError) {
          this._validationErrors.push(e.message)
        } else {
          throw e
        }
      }
    })
    if (this._validationErrors.length > 0) {
      return false
    } else return true
  }
}

function model(name: string, schema: Schema) {
  class ModelClass {
    [prop: string]: any
    _modelName: string
    _schema: Schema
    _id: ObjectId

    constructor() {
      // TODO accept vals in const
      this._modelName = name
      this._schema = schema
    }

    static _toModel(object: Record<string, unknown>): ModelClass {
      if (!object) return null
      const model = new ModelClass()
      Object.entries(object).forEach(([k, v]) => {
        model[k] = v
      })
      return model
    }

    static getCollection() {
      if (!_database) {
        throw new Error('Database not initialized')
      }
      return _database.collection(name)
    }

    static async findOne(query: Record<string, unknown>) {
      const object = await ModelClass.getCollection().findOne(query)
      return ModelClass._toModel(object)
    }

    static async find(query: Record<string, unknown>, options: FindOneOptions) {
      const objects = await ModelClass.getCollection().find(query, options).toArray()
      return objects.map((o) => ModelClass._toModel(o))
    }

    static async insert(data: Record<string, unknown>) {
      return ModelClass.getCollection().insertOne(data)
    }
    static async update(id: ObjectId, data: Record<string, unknown>) {
      // TODO use $set query
      return ModelClass.getCollection().replaceOne({ _id: id }, data)
    }

    toString() {
      return `${this._modelName} model instance\n` + JSON.stringify(this._toObject())
    }

    toJson() {
      return this._toObject()
    }

    _toObject() {
      const obj: { [k: string]: any } = {}
      if (this._id) obj._id = this._id
      // if (this.createdAt) obj.createdAt = this.createdAt
      // if (this.updatedAt) obj.updatedAt = this.updatedAt

      Object.entries(schema.schema).forEach(([fieldName]) => {
        if (fieldName in this) obj[fieldName] = this[fieldName]
      })
      return obj
    }

    reload() {
      // TODO imp
    }

    async save() {
      const plainObject = this._toObject()
      if (this._schema.validate(plainObject)) {
        if (!this._id) {
          plainObject.createdAt = new Date()
          plainObject.updatedAt = new Date()
          const res = await ModelClass.insert(plainObject)
          if (res.insertedCount < 1) throw new Error("Error insertin' document, partner")
          this._id = res.insertedId
          return this
        } else {
          plainObject.updatedAt = new Date()
          await ModelClass.update(this._id, plainObject)
        }
      } else {
        // eslint-disable-next-line no-console
        console.error('Validation errors: ' + this._schema._validationErrors.join(', '))
      }
    }
  }

  return ModelClass
}

export const BlogPostModel = model(
  'BlogPost',
  new Schema({
    title: String,
    body: String,
    published: {
      type: Boolean,
      default: false,
      optional: true,
    },
  })
)
