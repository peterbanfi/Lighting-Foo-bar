# TZPL (tanfolyam záró project leírás)

## A projekt célja
> __Webáruház__ létrehozása backend és frontend felülettel, teljes körű 
felhasználókezeléssel.

## Felhasznált eszközök
* A csapatok számára github blueprint projektet biztosítunk kiindulási alapként.
* MongoDB adatbáziskezelő.
* NodeJS backend oldali script.
* Angular 5 (6) frontend oldali keretrendszer.
* Bootstrap 4 (használható más CSS keretrendszer is, amely reszponzív 
megjelenést biztosít).

## Az alkalmazás részei

### Admin felület
* Az admin-felületet csak bejelentkezés után lehet elérni.
* __Dashboard:__ számokkal és grafikonon (google chart) is 
megjelennek a rendszer főbb statisztikai adatai: felhasználók száma, termékek 
száma, vásárlók száma. Példa: [SB Admin](https://blackrockdigital.github.io/startbootstrap-sb-admin/) 
* __Vásárlók:__ váráslók CRUD.
* __Rendelések:__ beérkező rendelések CRUD. 
* __Termékek:__ termékek CRUD.
* __Hozzászólások:__ hozzászólás CRUD.
* __Kategóriák:__ kategóriák CRUD.
* __Felhasználók:__ CRUD, ahol az admin jogosultságú felhasználókat kezeljük. 
  
__Az entitások alapvető jellemzői:__  
* A vásárlónál minimum tárolni kell: vezetéknév, keresztnév, email (ezzel lép be), 
jelszó, telefonszám, születési év, nem, lakcím, szállítási cím.
* A vásárlókat lehessen deaktiválni, így nem tudnak bejelentkezni az áruházba.
* A rendelésnél tárolni kell a megrendelt termékek azonosítóját, az aktuális árat, 
mennyiséget, a vásárló azonosítóját, a vásárló külön megjegyzését, dátumot. 
Vigyázz, a termékek tömbként fognak megjelenni a rendelésen belül, mivel egy 
rendelés során több terméket is meg lehet rendelni.
* A termékről tárolni kell: név, url (keresőbarát név), gyártó, aktív/inaktív, 
mennyiségi egység, kép, aktuális ár, 
szállítási határidő (pld: 2 nap, 3 hét, stb...), raktárkészlet. 
* A termékeket lehessen select segítségével kategóriákhoz rendelni. 
* A hozzászólások a termékekhez kapcsolódnak. 
* A felhasználók hozzászólásait lehessen jóváhagyni vagy elutasítani, 
addig ne jelenjenek meg, amíg jóvá nem hagyták az adminok őket.
* A kategóriáknál tárolni kell: név, url (keresőbarát név), aktív/inaktív, 
sorrend (a menüben hányadik legyen).
* A felhasználóknál tárolni kell: név, email (ezzel lép be az admin felületre), 
jelszó, aktív/inaktív.

### Frontend felület (a bolt)
> Alapvetően egy webáruház tetszőleges termékekkel.  
  
__Funkciók:__  
* Felhasználó kezelés: regisztráció, bejelentkezés, kijelentkezés, 
elfelejtett jelszó.
* Termékek listázása: a kezdőoldalon legyen 10 kiemelt termék. A bal oldali 
függőleges menüben legyenek felsorolva az aktív kategóriák. Az adott kategóriára 
kattintva jelenjenek meg a kategóriában tartozó termékek lista szerűen. 
Példa: [Termék lista](https://bootsnipp.com/snippets/featured/list-grid-view)
* Termék oldal: minden terméknek legyen külön oldala. Példa: [Termék oldal](https://bootsnipp.com/snippets/featured/product-page-for-online-shop)
* Minden termékhez legyen kép, leírás, mennyiségi egység, készlet, rendelés gomb, 
hozzászólás/kérdés a termékről lehetőség.
* Rendelés esetén kerüljön a termék a kosárba. A felhasználó kosarát tároljuk 
a localstorage segítségével, hogyha visszajön akkor megmaradjon a félbehagyott 
rendelése.
* Kosár nézet: egymás alatt listázva a rendelt tételek, összesítve legyen 
látható a teljes összeg (szállítási díj és lehetőség nem kell).
* A kosárból lehessen továbblépni a rendelés nézetre. Itt kérjük be a 
szállítási címet és legyen lehetőség külön kommentet adni (ide kérem, 
5 -ös csengő, stb...).
* __Keresőbarát url:__ úgy épüljenek fel az url-ek, hogy _boltneve/kategoria/termek_ 
tehát, ha például az a termék neve hogy: philips villanyborotva szakállvágóval, 
akkor az a keresőbarát url amit tárolunk az adatbázisban hogy 'philips-villanyborotva-szakallvogóval', a kategória neve borotvák aminek az url 
azaz keresőbarát címe a 'borotvak', tehát a teljes termék-url így fog kinézni:  
_localhost:4200/borotvak/philips-villanyborotva-szakallvogóval_

