# داشبورد صرافی با استفاده از ری اکت

## برای اجرای پروژه در ابتدا باید دو دستور زیر را در ترمینال وارد کنید

### `node src/server.js`

اجرای سرور بر روی پرت 8000 از مسیر src/server.js.

### `npm start`

اجرای اپ در حالت development.

### ` شرح پروژه`

پروژه داشبورد با استفاده از کتابخانه React ساخته شده و شامل احراز هویت کاربر میباشد و برای ui هم از CSS استفاده شده.
این برنامه به زبان فارسی نوشته شده,کاملا واکنش گراست و شامل بخش های :

صفحه ورود/
داشبورد (صفحه اصلی)/
حساب ها/
واریز/
برداشت/
انتقال/
گزارشات/
پشتیبانی
میباشد.
در ابتدا برای استفاده و تست تمام قسمت های برنامه باید یک حساب کاربری از قسمت
حساب ها > ایجاد حساب
ایجاد کنید
در این پروژه از Hook سفارشی برای مدیریت احراز هویت کاربر استفاده شده.

### `پکیج های استفاده شده`

پکیج های استفاده شده در این پروژه شامل :
react-router-dom : برای پیاده سازی و مدیریت route ها/
Ant design : در ui برای ساخت برخی المان ها و کامپوننت ها/
FontAwesome : برای ایحاد آیکون ها/
Chart js : برای ایجاد نمودار ها در صفحه اصلی داشبورد/
express,cors : برای ایجاد سرور و ساخت API/
uuid : برای id منحصر به فرد برای هر داده/
ckEditor : برای ادیتور متن در صفحه پشتیبانی

# `Exchange Dashboard Using React`

## `To use the project at First you have to enter these two command in terminal`

### `node src/server.js`

To run the server on port:8000 from src/server.js

### `npm start`

to run the project in development mode

### `Project Description`

The exchange dashboard project created by using React library and the app include user authentication and for the ui , CSS used.
this project build in persian language, its totaly responsive and it inclueds these sections :
Login Page/
Dashboard (Main Page)/
Deposit/
Withdraw/
Transfer/
Reports/

At first for use and test the project all section you have to create account from حساب ها > ایجاد حساب
In this project I used customized Hook for managing user authentication.

### `Packages`

The packages used in this project include:/
react-router-dom : For create and managing routes/
Ant design : For create and use some elements and components in ui/
FontAwesome : for creating icons/
Chart js : For creating charts in dashboard main page/
express,cors : for creating server and API/
uuid : for unique id for each data/
ckEditor : for text editor in support section
