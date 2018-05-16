# TZPL (tanfolyam záró project leírás)

## A projekt megnevezése
> __Szesz-pressz Webáruház__ létrehozása backend és frontend felülettel,  felhasználókezeléssel.

## 1. Sprint

### Backend

#### Felhasználó kezelés (Admin, Vásárlók)

Nyilvántartjuk a felhasználók adatait MongoDB adatbázisban. 
A felhasználók közt megkülönböztetünk admin-okat, akik minden funkcióhoz rendelkeznek jogosultsággal, és user-eket, akik a webáruház vásárlói. Ők csak a saját adataikat szerkeszthetik, előzetes vásárlásaikat látják.
A felhasználókról elsősorban a nevét, email címét, és jelszavát tároljuk regisztrációkor. 

A felhasználók authenktikációja (regisztráció, belépés, kilépés) alkalmával az alábbi elvásárokat vettük figyelembe, illetve kerültek beállításra:

* __regisztráció:__ 
  A regisztráció során a felhasználó nevét, email címét, és jelszavát (duplán) kell megadnia. Vizsgáljuk, hogy a két jelszó megeggyezik e.
  A jelszónak minimum 8 karakter hosszúnak kell lennie(ehhez telepíteni kellett a 'validator'-t).

* __bejelentkezés:__ 
  Emailcím, és jelszó alapján történik a belépés. 
  5 elrontott kísérlet után blokkoljuk 3 percre a bejelentkezést.


#### Termékek

A webáruházban kapható termékekről az alábbi adatokat kell nyilvántartani.

* azonosító kód
* megnevezés
* url (keresőbarát név, ha a termék neve: 'phillips villanyborotva szakállvágóval', 
  akkor az a keresőbarát url amit tárolunk az adatbázisban hogy 'phillips-villanyborotva-szakallvogóval')
* kép (csak a kép elérési útvonala a szerveren, scak egy darab kép kell)
* gyártó
* aktuális ár

A kép kivételével minden adat kötelező.

__Funkciók__: alap CRUD

#### Rendelések

Rendelések nyilvántartása.

__Adatok:__

* rendelés azonosító
* ki, azaz melyik user
* mikor
* milyen termékeket
* milyen mennyiségben
* milyen értékben

__Funkciók__: 

* rendelést leadni csak belépett user tud
* rendelést módosítani, törölni csak admin tud

### Frontend

#### Admin felület

El kell készítened Angular + Bootstrap segítségével a responsive, szabadon választott, de igényesen, esztétikusan megtervezett admin felületet a REST API-hoz.

Az admin-felületet csak bejelentkezés után lehet elérni az admin jogosultságúaknak.

__Oldalak/Funkciók:__

- __Dashboard:__ számokkal megjelennek a rendszer főbb statisztikai adatai: 
  - felhasználók száma, 
  - termékek száma, 
  - vásárlók száma. 
  - adott havi bevétel (számmal és grafikonon (pl.: google chart) is, napokra bontva)
  - Példa: [SB Admin](https://blackrockdigital.github.io/startbootstrap-sb-admin/) 
- __Vásárlók:__ vásárlók CRUD.
- __Rendelések:__ beérkező rendelések CRUD. A felhasználók általi Rendelések leadását elég egyelőre csak működés szintjén tesztelni. Ezen az oldalon csak az admin látja/módosíthatja a rendeléseket.
- __Termékek:__ termékek CRUD. Képfeltöltés is lehetséges az adott termékhez.
- __Felhasználók:__ 
  - CRUD, ahol az admin, és a user jogosultságú felhasználókat is kezeljük
  - az admin felhasználók a regisztrált emberek jogosultságát módosítani tudják egy egyszerű select segítségével. 

## 2. Sprint

A második _sprint_  célja az eddig elkészül webáruház bővítése a megrendelő által kért új funkciókkal.
A sprint végén be kell mutatni az elkészült forráskódot, a megírt teszteket (PostMan, mocha + chai), a működő admin felületet, mely teljesíti a webáruház következő, új funkcióit:

### Backend

#### Felhasználó kezelés (Admin, Vásárlók)

A regisztrált felhasználók a profil oldalukon az alábbi adatokat is megadhatják:

* alapértelmezett számlázási cím (szétbontva) 
* alapértelmezett szállítási cím (szétbontva)
* telefonszám 

__Új Funkciók__:

- __adatmódosítás__
- __jelszómódosítás__ (duplán kell bekérni)

#### Termékek

__Új adatok__:

- _értékelések_
- _kategória_

__Funkciók__: alap CRUD

#### Értékelések

Tárolni kell hogy ki, mikor, melyik termékhez írt értékelést.

__Új  Funkciók__:

A termékekhez csak olyan vásárló tudjon értékelést írni, aki valóban vásárolt is az adott termékből. 

#### Rendelések

A felhasználótól a vásárlás végén számlázási, és szállítási címét, telefonszámát is bekérjük, ha nincs a profilban megadva.

A rendeléseknél ezek alapján új adatokat is nyílván kell tartani.

__Új adatok:__

- milyen címre
- milyen számlázási címre

__Új Funkciók__: 

- a megadott címet, számlázási címet, és ha adott meg telefonszámot, azt le kell tárolni a felhasználó adataihoz. Ha már volt tárolva, az új adatokkal felül kell írnunk.

#### Kategóriák

Minden termék egy termékkategóriába tartozik. Nem tartozhat több kategóriába egy termék sem. 
A kategóriáknak egyedinek kell lennie, és nem case sensitive a kategórianév.

A kategóriáknál tárolni kell a  sorrendet, azaz hogy a menüben hányadikként jelenjen meg.

__Funkciók__: alap CRUD

### Frontend

#### Admin felület új menüpontok:
* __Kategóriák:__ kategóriák CRUD.
* __Termékek__: Egy egyszerű select-el kiválasztható a termék kategóriája is.

#### Publikus oldalak/Profil oldala
> Alapvetően egy webáruház tetszőleges termékekkel.  

__Oldalak/Funkciók:__  

A publikus oldalak mindenki számára elérhetők. A design szabadon választott, de illeszkednie kell az admin oldalak kinézetéhez. 

* __Felhasználó kezelés:__ regisztráció, bejelentkezés, kijelentkezés.

* __Index:__ a kezdőoldalon legyen a 10 legfrissebb, azaz a legutóbb felvitt  termékek. A bal oldali 
  függőleges menüben legyenek felsorolva a kategóriák. Az adott kategóriára 
  kattintva jelenjenek meg a kategóriában tartozó termékek lista szerűen. 
  Példa: [Termék lista](https://bootsnipp.com/snippets/featured/list-grid-view)

* __Termék oldal:__ minden terméknek legyen külön oldala. Példa: [Termék oldal](https://bootsnipp.com/snippets/featured/product-page-for-online-shop)

  Terméket a kosárba helyezni itt a termék oldalon tudunk. A felhasználó kosarát tároljuk a localstorage segítségével, hogyha visszajön akkor megmaradjon a félbehagyott rendelése.


* __Kosár nézet:__ egymás alatt listázva a rendelt tételek, összesítve legyen 
  látható a teljes összeg (szállítási díj és lehetőség nem kell).
* __Rendelés nézet:__ A kosárból lehessen továbblépni a rendelés nézetre. Itt tudjuk a termékek darabszámát növelni, vagy törölni egy terméket a kosárból. Ha a felhasználó nincs belépve, a rendelés leadásához léptessük be. A rendelési mezőknél a felhasználó adatai automatikusan kerüljenek kitöltésre. A szállítási és számlázási címet kötelezően meg kell adni. 
* __Profil oldal__:  a felhasználóknak itt tudják a módosítani az összes adatukat, megváltoztatni a jelszavukat, kilistázni az eddigi rendeléseiket.
* __Kapcsolat oldal:__ Cégadatok megjelenítése, valamint egy google maps vagy valamilyen nyilvános API használatával egy térkép megjelenítése, melyen a cég székhelye jelölve van. Az oldalon lehetőség van emailt küldeni az oldal tulajdonosának/üzemeltetőjének.  Használjatok Nodemailert.