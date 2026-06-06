# 📱 LuxeRetail - مشروع متجر فاخر على الإنترنت

## توثيق شامل للمشروع

---

## 🎯 نظرة عامة على المشروع

**LuxeRetail** هو متجر إلكتروني حديث ومتقدم مبني باستخدام **React 19** و **Vite**، يوفر تجربة تسوق فاخرة مع جميع الميزات الضرورية لمتجر إلكتروني عصري.

### المعلومات الأساسية:

- **اسم المشروع**: LuxeRetail
- **النسخة**: 0.0.0
- **النوع**: Single Page Application (SPA)
- **الحالة**: قيد التطوير

---

## 🛠️ التقنيات والمكتبات المستخدمة

### Frontend Stack:

| الطبقة               | التقنية          | الإصدار       |
| -------------------- | ---------------- | ------------- |
| **UI Library**       | React            | 19.2.6        |
| **Build Tool**       | Vite             | 8.0.12        |
| **Styling**          | Tailwind CSS     | 4.3.0         |
| **Routing**          | React Router DOM | 7.16.0        |
| **State Management** | Zustand          | 5.0.14        |
| **Forms**            | Formik + Yup     | 2.4.9 + 1.7.1 |
| **HTTP Client**      | Axios            | 1.16.1        |
| **Data Fetching**    | React Query      | 5.101.0       |
| **Icons**            | Lucide React     | 1.17.0        |

### Backend/API:

- **API**: MockAPI (https://6a1f9defe96c1d13b5860ddd.mockapi.io)
- **Database**: MockAPI - تخزين المنتجات والمستخدمين

### Development Tools:

- **ESLint**: 10.3.0 (لضمان جودة الكود)
- **Babel**: 7.29.0 (لتحويل JSX)
- **TypeScript Definitions**: متضمنة

---

## 📁 هيكل المشروع

```
luxe-retail/
├── src/
│   ├── api/                          # API Integration
│   │   ├── axios.js                 # إعدادات Axios (Base URL)
│   │   ├── products.js              # دوال جلب المنتجات
│   │   ├── users.js                 # دوال المستخدمين والمصادقة
│   │   └── orders.js                # دوال الطلبات
│   │
│   ├── assets/                       # الصور والموارد (فارغة حالياً)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── RootLayout.jsx       # Layout الرئيسي (Navbar, Footer, Outlet)
│   │   │   ├── Navbar.jsx           # شريط التنقل
│   │   │   └── Footer.jsx           # التذييل
│   │   │
│   │   └── ui/
│   │       ├── ProductCard.jsx      # بطاقة المنتج (مع زر Wishlist و Add to Cart)
│   │       ├── CartDrawer.jsx       # درج العربة (معاينة سريعة)
│   │       └── Toast.jsx            # إخطارات النظام
│   │
│   ├── constants/
│   │   └── promo.js                 # ثوابت رموز العروض الترويجية
│   │
│   ├── hooks/
│   │   └── useProducts.js           # Hook لجلب المنتجات مع React Query
│   │
│   ├── pages/                        # الصفحات الرئيسية
│   │   ├── Home/Home.jsx            # الصفحة الرئيسية (مع hero slider)
│   │   ├── Shop/Shop.jsx            # صفحة المتجر (جميع المنتجات)
│   │   ├── Categories/Categories.jsx # صفحة الفئات
│   │   ├── Category/Category.jsx    # صفحة فئة واحدة
│   │   ├── Product/Product.jsx      # صفحة تفاصيل المنتج
│   │   ├── Cart/Cart.jsx            # صفحة السلة مع نموذج الدفع (Multi-step)
│   │   ├── Wishlist/Wishlist.jsx    # قائمة الأمنيات
│   │   ├── About/About.jsx          # صفحة من نحن
│   │   ├── Login/Login.jsx          # صفحة تسجيل الدخول
│   │   ├── Register/Register.jsx    # صفحة التسجيل
│   │   ├── Profile/Profile.jsx      # ملف المستخدم الشخصي
│   │   └── OrderConfirmation/OrderConfirmation.jsx # تأكيد الطلب
│   │
│   ├── router/
│   │   ├── index.jsx                # تعريف جميع المسارات
│   │   └── ProtectedRoute.jsx       # مكون لحماية المسارات المحمية
│   │
│   ├── store/                        # Zustand Stores
│   │   ├── authStore.js             # حالة المصادقة والمستخدم
│   │   ├── cartStore.js             # حالة عربة التسوق
│   │   ├── orderStore.js            # حالة الطلبات
│   │   ├── wishlistStore.js         # حالة قائمة الأمنيات
│   │   └── toastStore.js            # حالة الإخطارات
│   │
│   ├── App.css                      # Styles
│   ├── index.css                    # Tailwind & Global Styles
│   └── main.jsx                     # Entry Point
│
├── public/                           # الملفات العامة
├── index.html                        # صفحة HTML الرئيسية
├── vite.config.js                   # إعدادات Vite
├── eslint.config.js                 # ESLint Configuration
├── package.json                      # المتطلبات والـ Scripts
├── pnpm-lock.yaml                   # ملف القفل
└── README.md                         # التوثيق الأساسي
```

---

## 🔐 نظام المصادقة (Authentication)

### اسم الـ Store: `useAuthStore` (authStore.js)

```javascript
{
  user: null | { id, name, email, address },
  isAuthenticated: boolean,

  login(userData),        // تسجيل الدخول
  logout(),              // تسجيل الخروج
  updateUser(userData)   // تحديث بيانات المستخدم
}
```

### الخصائص:

- **Persistence**: يتم حفظ بيانات المستخدم في localStorage تحت المفتاح `auth-storage`
- **عند تسجيل الدخول**: يتم جلب البيانات من MockAPI ثم حفظها محلياً
- **عند إعادة تحميل الصفحة**: يتم استرجاع البيانات من localStorage

### Endpoints:

- `GET /users?email=EMAIL` - البحث عن المستخدم بالبريد الإلكتروني
- `POST /users` - إنشاء حساب جديد (Registration)
- `PUT /users/:id` - تحديث بيانات المستخدم

---

## 🛒 نظام عربة التسوق

### اسم الـ Store: `useCartStore` (cartStore.js)

```javascript
{
  items: [],                    // منتجات السلة
  isCartOpen: boolean,         // حالة عرض درج السلة
  activeDiscount: null | {},   // الخصم المطبق

  addItem(product),            // إضافة منتج
  removeItem(id),              // حذف منتج
  updateQuantity(id, qty),     // تحديث الكمية
  clearCart(),                 // تفريغ السلة
  applyPromoCode(code),        // تطبيق كود عرض ترويجي
  clearPromoCode(),            // إزالة الخصم
  getDiscountAmount(),         // حساب قيمة الخصم
  getTotalPrice(),             // السعر الإجمالي
  getTotalItems(),             // عدد المنتجات
  setCartOpen(boolean)         // فتح/إغلاق درج السلة
}
```

### الميزات:

- **Persistence**: يتم حفظ السلة في localStorage (ما عدا `isCartOpen`)
- **إضافة تلقائية**: إذا كان المنتج موجود، يتم زيادة الكمية بدلاً من إضافته مرة أخرى
- **حذف تلقائي للخصم**: عند تفريغ السلة أو عند نقصان السعر

---

## 🎁 نظام العروض الترويجية (Promo Codes)

### الرموز المتاحة:

| الكود      | نوع الخصم  | القيمة | الشروط                  |
| ---------- | ---------- | ------ | ----------------------- |
| **LUXE10** | نسبة مئوية | 10%    | لا توجد شروط            |
| **SAVE50** | مبلغ ثابت  | $50    | الحد الأدنى للطلب: $200 |

### شحن مجاني:

- **شروط**: عندما يكون إجمالي الطلب (بعد الخصم) **$150 أو أكثر**
- **السعر الافتراضي**: $15

---

## 📦 نظام الطلبات

### اسم الـ Store: `useOrderStore` (orderStore.js)

```javascript
{
  orders: [],                  // قائمة جميع الطلبات
  currentOrder: null | {},     // الطلب الحالي

  createOrder(payload),        // إنشاء طلب جديد
  replaceOrders(orders),       // استبدال قائمة الطلبات
  setOrders(orders)            // تعيين الطلبات
}
```

### هيكل الطلب:

```javascript
{
  orderNumber: "#LX-1234567",      // رقم الطلب الفريد
  createdAt: "ISO Date String",    // تاريخ الإنشاء
  items: [],                        // المنتجات المطلوبة
  subtotal: number,               // الإجمالي قبل الشحن والضرائب
  shipping: number,               // تكلفة الشحن
  tax: number,                    // الضرائب
  total: number,                 // الإجمالي النهائي
  status: "Processing",           // حالة الطلب
  shippingAddress: {}             // عنوان الشحن
}
```

### Persistence:

- يتم حفظ الطلبات محلياً في localStorage
- يتم أيضاً حفظها على MockAPI تحت بيانات المستخدم

---

## 💭 نظام قائمة الأمنيات (Wishlist)

### اسم الـ Store: `useWishlistStore` (wishlistStore.js)

```javascript
{
  items: ([], // المنتجات المفضلة
    addItem(product), // إضافة إلى قائمة الأمنيات
    removeItem(id), // حذف من قائمة الأمنيات
    isWished(id), // التحقق من وجود المنتج
    clearWishlist(), // تفريغ القائمة
    getTotalItems()); // عدد المنتجات
}
```

### الخصائص:

- **Persistence**: يتم حفظ في localStorage تحت المفتاح `wishlist-storage`
- **String/Number ID**: يتم التعامل مع IDs كـ strings و numbers بشكل متوافق

---

## 🔔 نظام الإخطارات (Toast)

### اسم الـ Store: `useToastStore` (toastStore.js)

```javascript
{
  toast: (null | { id, message, type },
    showToast(message, (type = "success")), // عرض إخطار
    hideToast()); // إخفاء الإخطار
}
```

### أنواع الإخطارات:

- `"success"` - إخطار نجاح (أخضر)
- `"error"` - إخطار خطأ (أحمر)
- `"info"` - معلومة (أزرق)

### المدة الزمنية:

- الإخطار يظهر لمدة **2.4 ثانية** ثم يختفي تلقائياً

---

## 📄 صفحات التطبيق

### 1. **الصفحة الرئيسية** (`/`)

- **الملف**: `Home.jsx`
- **الميزات**:
  - Slider بطول كامل (Hero Slider)
  - فئات المنتجات
  - شبكة منتجات (مع تصفية حسب الفئة)
  - روابط سهلة التنقل

### 2. **صفحة المتجر** (`/shop`)

- **الملف**: `Shop.jsx`
- **الميزات**:
  - عرض جميع المنتجات
  - البحث (Search)
  - الفرز (Sorting)
  - التصفية حسب الفئة

### 3. **صفحة الفئات** (`/categories`)

- **الملف**: `Categories.jsx`
- **الميزات**:
  - عرض جميع الفئات
  - الانتقال إلى فئة محددة

### 4. **صفحة الفئة الواحدة** (`/categories/:name`)

- **الملف**: `Category.jsx`
- **الميزات**:
  - عرض المنتجات في فئة محددة
  - البحث والفرز داخل الفئة

### 5. **صفحة تفاصيل المنتج** (`/product/:id`)

- **الملف**: `Product.jsx`
- **الميزات**:
  - عرض تفاصيل المنتج الكاملة
  - صور متعددة (إن وجدت)
  - إضافة إلى السلة
  - إضافة إلى قائمة الأمنيات
  - المنتجات ذات الصلة

### 6. **صفحة السلة** (`/cart`) - محمية

- **الملف**: `Cart.jsx`
- **الميزات**:
  - عرض جميع منتجات السلة
  - تعديل الكميات
  - حذف المنتجات
  - تطبيق رموز العروض الترويجية
  - **خطوات Checkout**:
    - **الخطوة 0**: مراجعة (Review Cart)
    - **الخطوة 1**: معلومات الشحن (Shipping Address)
    - **الخطوة 2**: معلومات الدفع (Payment Information)
    - **الخطوة 3**: تأكيد الطلب (Confirmation)
  - حسابات السعر التلقائية (الخصم، الشحن، الضرائب)

### 7. **صفحة قائمة الأمنيات** (`/wishlist`)

- **الملف**: `Wishlist.jsx`
- **الميزات**:
  - عرض المنتجات المفضلة
  - إزالة من القائمة
  - إضافة إلى السلة مباشرة

### 8. **صفحة من نحن** (`/about`)

- **الملف**: `About.jsx`
- **الميزات**:
  - معلومات عن العلامة التجارية
  - القيم والرؤية

### 9. **صفحة تسجيل الدخول** (`/login`)

- **الملف**: `Login.jsx`
- **الميزات**:
  - نموذج تسجيل دخول بـ Formik + Yup
  - التحقق من صحة البيانات
  - معالجة الأخطاء من MockAPI
  - تصميم نصفي (ديكوراتيف على اليسار، نموذج على اليمين)

### 10. **صفحة التسجيل** (`/register`)

- **الملف**: `Register.jsx`
- **الميزات**:
  - نموذج تسجيل جديد
  - التحقق من عدم وجود البريد الإلكتروني مسبقاً
  - حفظ البيانات على MockAPI

### 11. **صفحة الملف الشخصي** (`/profile`) - محمية

- **الملف**: `Profile.jsx`
- **الميزات**:
  - عرض بيانات المستخدم
  - تعديل عنوان الشحن
  - عرض سجل الطلبات
  - مستوى العضوية (Membership Tier)
  - مزامنة مع MockAPI

### 12. **صفحة تأكيد الطلب** (`/order-confirmation`) - محمية

- **الملف**: `OrderConfirmation.jsx`
- **الميزات**:
  - عرض تفاصيل الطلب الذي تم إنشاؤه
  - رقم الطلب الفريد
  - معلومات الشحن والدفع

---

## 🛣️ المسارات (Routes)

```
/                      → الصفحة الرئيسية
/shop                  → صفحة المتجر
/categories            → الفئات
/categories/:name      → فئة محددة
/product/:id           → تفاصيل المنتج
/cart                  → السلة (محمية)
/wishlist              → قائمة الأمنيات
/about                 → من نحن
/login                 → تسجيل الدخول
/register              → التسجيل
/profile               → الملف الشخصي (محمية)
/order-confirmation    → تأكيد الطلب (محمية)
```

### المسارات المحمية:

- `/cart` - يتطلب تسجيل دخول
- `/profile` - يتطلب تسجيل دخول
- `/order-confirmation` - يتطلب تسجيل دخول

---

## 🔌 API Endpoints

### Base URL:

```
https://6a1f9defe96c1d13b5860ddd.mockapi.io
```

### المنتجات:

```
GET  /products        → جميع المنتجات
GET  /products/:id    → منتج محدد
```

### المستخدمون:

```
GET  /users           → جميع المستخدمين
GET  /users?email=X   → البحث عن مستخدم بالبريد
POST /users           → إنشاء مستخدم جديد (Register)
PUT  /users/:id       → تحديث بيانات المستخدم
```

### ملاحظة حول الطلبات:

- لا توجد endpoints منفصلة للطلبات
- الطلبات يتم حفظها كـ `orders` array داخل record المستخدم
- عند الدفع، يتم تحديث المستخدم مع إضافة الطلب للـ array

---

## 🎨 نظام الألوان والتصميم

### Tailwind CSS:

- **الإصدار**: 4.3.0
- **الثيمات المدعومة**: Light (فاتح) و Dark (مظلم)
- **الألوان الأساسية**:
  - Slate/Gray - الألوان الأساسية
  - Blue/Amber/Emerald - الألوان الزخرفية

### Dark Mode:

- يتحكم به من خلال toggle في Navbar
- يتم حفظ تفضيل المستخدم

### Icons:

- **Lucide React** - مكتبة icons عصرية

---

## 💾 State Management Architecture

### Zustand:

- **السبب**: خفيف الوزن وسهل الاستخدام
- **الـ Stores**:
  1. `authStore` - المصادقة
  2. `cartStore` - عربة التسوق
  3. `orderStore` - الطلبات
  4. `wishlistStore` - قائمة الأمنيات
  5. `toastStore` - الإخطارات (بدون persistence)

### Persistence:

- معظم الـ stores تستخدم middleware `persist` لحفظ البيانات في localStorage
- معفى: `toastStore` و `isCartOpen` من cartStore

---

## 🔄 Data Flow

### عند التسجيل:

```
User Registration → MockAPI POST /users → authStore (login) → localStorage (auth-storage)
```

### عند تسجيل الدخول:

```
Login Form → MockAPI GET /users?email=X → Password Validation → authStore (login) → localStorage (auth-storage)
```

### عند الشراء:

```
1. User adds products → cartStore
2. User enters promo code → cartStore (applyPromoCode)
3. User fills shipping info → Cart Component
4. User enters payment info → Cart Component
5. User submits → orderStore (createOrder) + MockAPI PUT /users/:id + localStorage (orders)
6. Redirect to /order-confirmation
```

### عند تحميل الملف الشخصي:

```
User visits /profile → fetchAuthUserByEmail → getOrdersForUser → orderStore (replaceOrders)
```

---

## 🚀 الأوامر

### التثبيت والتطوير:

```bash
pnpm install      # تثبيت المتطلبات
pnpm dev          # تشغيل سيرفر التطوير (http://localhost:5173)
pnpm build        # بناء النسخة الإنتاجية
pnpm preview      # معاينة النسخة المبنية
pnpm lint         # التحقق من جودة الكود
```

### ملاحظة:

- المشروع يستخدم **pnpm** (أسرع من npm)
- يمكن استخدام npm بدلاً منه إذا لم يكن pnpm مثبتاً

---

## 🌐 متغيرات البيئة (Environment Variables)

### اختياري:

يمكن إنشاء ملف `.env` في جذر المشروع:

```env
VITE_API_URL=https://6a1f9defe96c1d13b5860ddd.mockapi.io
```

### الاستخدام:

```javascript
import.meta.env.VITE_API_URL;
```

---

## 📱 ميزات الاستجابة (Responsive Design)

- **Mobile First**: التصميم يبدأ من الهاتف ثم يتوسع
- **Breakpoints** (Tailwind):
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

---

## 🔍 معالجة الأخطاء

### Global Error Boundaries:

- لم يتم تنفيذ Error Boundary component حالياً
- معالجة الأخطاء يتم في مستوى Component

### API Error Handling:

- MockAPI returns 404 عند عدم العثور على نتيجة في بعض الاستعلامات
- يتم التعامل معها بـ try-catch blocks

---

## 🔐 الأمان

### Password Storage:

- ⚠️ تحذير: MockAPI لا يشفر كلمات المرور
- في التطبيق الفعلي، يجب استخدام Hash (bcrypt, argon2)

### SSL/HTTPS:

- MockAPI يستخدم HTTPS
- التطبيق يعمل بشكل آمن

### CORS:

- MockAPI قد يفرض قيود CORS
- يجب التأكد من تكوين الـ headers بشكل صحيح

---

## 🚢 النشر (Deployment)

### خوارزميات النشر المدعومة:

1. **Vercel**
2. **Netlify**
3. **أي Static Host آخر**

### خطوات النشر:

1. ربط مستودع Git
2. تشغيل `pnpm build`
3. نشر مجلد `dist/`

---

## 📋 ملخص الميزات الرئيسية

✅ **المصادقة والتسجيل** - مع MockAPI
✅ **عربة تسوق كاملة** - مع persistence
✅ **نظام طلبات متكامل** - Multi-step checkout
✅ **قائمة أمنيات** - Save for later
✅ **نظام عروض ترويجية** - Promo codes
✅ **سجل الطلبات** - في ملف المستخدم
✅ **Dark Mode** - مدعوم كاملاً
✅ **Responsive Design** - يعمل على جميع الأجهزة
✅ **Form Validation** - Formik + Yup
✅ **إخطارات فعلية** - Toast notifications

---

## 🐛 الأخطاء الشهيرة والحلول

### خطأ: "Cannot read property 'map' of undefined"

**السبب**: محاولة عرض بيانات غير موجودة
**الحل**: استخدام Optional chaining `?.map` أو التحقق من وجود البيانات

### خطأ: CORS عند جلب البيانات

**السبب**: قيود CORS من MockAPI
**الحل**: التأكد من أن الطلب يستخدم نفس البروتوكول والـ domain

### الـ localStorage ممتلئ

**السبب**: تراكم البيانات الكثيرة
**الحل**: مسح بيانات معينة أو استخدام IndexedDB

---

## 📚 الموارد الإضافية

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Router Documentation](https://reactrouter.com)
- [Zustand Documentation](https://zustand-demo.vercel.app)
- [Formik Documentation](https://formik.org)
- [Yup Documentation](https://github.com/jquense/yup)
- [Axios Documentation](https://axios-http.com)
- [MockAPI Documentation](https://mockapi.io)

---

## 👤 معلومات التطوير

**تم إنشاء هذا التوثيق في**: 2024
**الحالة**: قيد التطوير والتحسين

---

## 📝 ملاحظات مهمة

### للمطورين الجدد:

1. قراءة هذا التوثيق بالكامل أولاً
2. تشغيل التطبيق محلياً: `pnpm dev`
3. استكشاف أنماط الكود الموجودة
4. اتباع نفس الأنماط عند إضافة ميزات جديدة

### نقاط التحسين المستقبلية:

- إضافة unit tests
- تحسين الـ performance
- إضافة more payment methods
- دعم لغات متعددة (i18n)
- Progressive Web App (PWA)

---

**آخر تحديث**: 2026-06-04
**مصدر**: توثيق شامل من فحص كامل المشروع
