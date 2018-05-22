## A projekt megnevezése
> __Szeszpress Webáruház__ létrehozása backend és frontend felülettel,  felhasználókezeléssel.

## 1. Sprint

### Backend

#### Felhasználó kezelés (Admin, Vásárlók)

Nyilvántartjuk a felhasználók adatait egy felhő alapú MongoDB adatbázisban. 
A felhasználók közt megkülönböztetünk adminokat, aki minden funkcióhoz rendelkeznek jogosultsággal, és felhasználót, akik a webáruház vásárlói. Ők csak a saját adataikat szerkeszthetik, előzetes vásárlásaikat látják.
A felhasználókról elsősorban a nevét, email címét, és jelszavát tároljuk regisztrációkor. 

A felhasználók authenktikációja (regisztráció, belépés, kilépés) alkalmával az alábbi elvásárokat vettük figyelembe, illetve kerültek beállításra:

* __regisztráció:__ 
  A regisztráció során a felhasználó nevét, email címét, és jelszavát (duplán) kell megadnia. Vizsgáljuk, hogy a két jelszó megegyezik e.
  A jelszónak minimum 8 karakter hosszúnak kell lennie(ehhez telepíteni kellett a 'validator'-t).

* __bejelentkezés:__ 
  Email cím, és jelszó alapján történik a belépés. 
  5 elrontott kísérlet után blokkoljuk 3 percre a bejelentkezést.

Ha a bejelentkezés/regisztráció nem sikeres egy ablakban jön a felhasználónak a figyelmeztetés.

#### Termékek

A Szeszpress webáruházunkban kapható termékekről az alábbi adatokat tartjuk nyilván:

* azonosító kód
* megnevezés
* url
* kép
* gyártó
* aktuális ár 
* melyik admin hozta létre 

Az adatok, amelyek listázásra kerülnek:

* azonosító kód
* megnevezés
* kereső szavak
* kép
* gyártó
* aktuális ár
* létrehozás ideje
* módosítás ideje


__Funkciók__: 

* listázás
* keresés egy adott azonosító alapján
* létrehozás
* szerkesztés
* törlés

Terméket létrehozni, szerkeszteni és törölni csak admin jogosultsággal rendelkező felhasználó tud.
A jogosultság ellenőrzését frontend oldalon Interceptor module segítségével valósítottuk meg.

#### Rendelések

Rendelések nyilvántartása.

__Adatok:__

* rendelés azonosító
* a felhasználó, aki rendelt (a felhasználó neve - username is megjelenik)
* mikor történt a rendelés/módosítás
* rendelt termékek, mennyiségük és az értékük

__Funkciók__: 

* rendelést leadni csak regisztrált, belépett felhasználó tud
* rendelés módosítása, törlése szintén az admin jogosultsághoz van kötve.

Részletes unit tesztek kerültek megírásra a különböző CRUD folyamatokhoz. A tesztek működnek a regisztráció, a bejelentkezés, a termékek és a rendelések esetén is.


### Frontend

#### Admin felület

Angular + Bootstrap segítségével létrehoztunk egy responsive, igényesen, esztétikusan megtervezett admin felületet a webshopunkhoz.


__Oldalak/Funkciók:__

- __Statistic:__ számokkal megjelennek a rendszer főbb statisztikai adatai: 
  - felhasználók száma, 
  - termékek száma,
  - vásárlók száma,
  - adott havi bevétel megjelenítése (számmal és grafikonon (ng2 google-chart használatával) is, napokra bontva) 
- __Orders:__ beérkező rendelések CRUD. 
- __Products:__ termékek CRUD. Képfeltöltés is lehetséges az adott termékhez.
- __Users:__ 
  - CRUD, ahol az admin, és a user jogosultságú felhasználókat is kezeljük
  - az admin felhasználók a regisztrált emberek jogosultságát módosítani tudják egy egyszerű select segítségével. 


## 2. Sprint

#### Kapcsolat oldal

A térkép megjelenítését a frontend részén a agm-map -pal készítettük el. Ehhez telepíteni kellett:
npm install @agm/core --save


