
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.RegionScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.SessionsScalarFieldEnum = {
  id: 'id',
  ip_address: 'ip_address',
  date: 'date',
  device: 'device',
  user_id: 'user_id'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  fullName: 'fullName',
  phone: 'phone',
  password: 'password',
  role: 'role',
  isActive: 'isActive'
};

exports.Prisma.ToolScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en',
  description_uz: 'description_uz',
  description_ru: 'description_ru',
  description_en: 'description_en',
  price: 'price',
  quantity: 'quantity',
  code: 'code',
  brand: 'brand',
  isActive: 'isActive',
  capacity: 'capacity',
  size: 'size',
  image: 'image'
};

exports.Prisma.BrandScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en'
};

exports.Prisma.SizeScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en'
};

exports.Prisma.CapacityScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en'
};

exports.Prisma.ProductScalarFieldEnum = {
  id: 'id',
  isActive: 'isActive',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en',
  image: 'image',
  minWorkingHours: 'minWorkingHours',
  levels: 'levels',
  price_hourly: 'price_hourly',
  price_daily: 'price_daily',
  tools: 'tools'
};

exports.Prisma.MasterScalarFieldEnum = {
  id: 'id',
  fullName: 'fullName',
  phone: 'phone',
  isActive: 'isActive',
  year: 'year',
  products: 'products',
  minWorkingHours: 'minWorkingHours',
  level: 'level',
  price_hourly: 'price_hourly',
  price_daily: 'price_daily',
  experience: 'experience',
  tools: 'tools',
  image: 'image',
  passportImage: 'passportImage',
  star: 'star',
  about: 'about'
};

exports.Prisma.LevelScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en'
};

exports.Prisma.OrderScalarFieldEnum = {
  id: 'id',
  productInfo: 'productInfo',
  tools: 'tools',
  total: 'total',
  location_lat: 'location_lat',
  location_long: 'location_long',
  address: 'address',
  date: 'date',
  paymentType: 'paymentType',
  withDelivery: 'withDelivery',
  status: 'status',
  commentToDelivery: 'commentToDelivery',
  masters: 'masters'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  message: 'message',
  stars: 'stars',
  masters: 'masters'
};

exports.Prisma.ContactScalarFieldEnum = {
  id: 'id',
  name: 'name',
  surName: 'surName',
  phone: 'phone',
  address: 'address',
  message: 'message'
};

exports.Prisma.FAQScalarFieldEnum = {
  id: 'id',
  question: 'question',
  answer: 'answer'
};

exports.Prisma.BasketScalarFieldEnum = {
  id: 'id',
  content: 'content'
};

exports.Prisma.ShowcaseScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en',
  description_uz: 'description_uz',
  description_ru: 'description_ru',
  description_en: 'description_en',
  image: 'image',
  link: 'link'
};

exports.Prisma.PartnersScalarFieldEnum = {
  id: 'id',
  name_uz: 'name_uz',
  name_ru: 'name_ru',
  name_en: 'name_en',
  image: 'image'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  Region: 'Region',
  Sessions: 'Sessions',
  User: 'User',
  Tool: 'Tool',
  Brand: 'Brand',
  Size: 'Size',
  Capacity: 'Capacity',
  Product: 'Product',
  Master: 'Master',
  Level: 'Level',
  Order: 'Order',
  Comment: 'Comment',
  Contact: 'Contact',
  FAQ: 'FAQ',
  Basket: 'Basket',
  Showcase: 'Showcase',
  Partners: 'Partners'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
