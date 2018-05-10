# TZPL (tanfolyam záró project leírás)

## A projekt megnevezése/célja
> __Webáruház__ létrehozása backend és frontend felülettel, teljes körű  felhasználókezeléssel.

## Alapkövetelmények
1. Az API javascript file-jainak 100%-ban meg kell felelnie a backend mappa 
gyökérkönyvtárában található .eslintrc-ben definiált konvencióknak.
2. A teljes projekt kódjának meg kell felelnie a Clean Code szabályainak.
3. Használható, bőbeszédű README.md írása.
4. Minimum 2 nézete legyen a frontend oldalaknak. Mobil, és desktop.
5. A typescript kódodnak 100%-ban meg kell felelni az alapértelmezett Angularos TSlint
szabályoknak.
6. A css fájloknak a frontend mappa gyökerében található .stylelintrc szabályoknak meg kell felelnie.
7. A REST API-t mind natívan kell tesztelni, Postman segítségével, mind pedig unit teszteket kell írni. A Unit tesztek során mindegyik metódusunknál a response státuszkódját, a kapott adat típusát,
és értékeit is vizsgálni kell.
Ha egy objektumot várunk vissza, akkor az objektum tulajdonságait külön vizsgáljuk le.
Pl.: https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai 

## Felhasznált eszközök
* A csapatok számára github blueprint projektet biztosítunk kiindulási alapként. A kiinduló projetkben egy egyszerű
felhasználó - blogbejegyzés típusú REST API van, felhasználói hitelesítéssel.
* MongoDB adatbáziskezelő.
* NodeJS.
* Angular 5 (6) frontend oldali keretrendszer.
* Bootstrap 4 (használható más CSS keretrendszer is, amely reszponzív megjelenést biztosít).

## Az alkalmazás részei

### Admin felület
* Az admin-felületet csak bejelentkezés után lehet elérni.
* __Dashboard:__ számokkal és grafikonon (google chart) is 
megjelennek a rendszer főbb statisztikai adatai: felhasználók száma, termékek 
száma, vásárlók száma. Példa: [SB Admin](https://blackrockdigital.github.io/startbootstrap-sb-admin/) 
* __Vásárlók:__ vásárlók CRUD.
* __Rendelések:__ beérkező rendelések CRUD. 
* __Termékek:__ termékek CRUD.
* __Hozzászólások:__ hozzászólás CRUD.
* __Kategóriák:__ kategóriák CRUD.
* __Felhasználók:__ CRUD, ahol az admin jogosultságú felhasználókat kezeljük. Az adatbázisba mentsd le
role-ba ki az admin.
  
__Az entitások alapvető jellemzői:__  
* A vásárlónál minimum tárolni kell: vezetéknév, keresztnév, email (ezzel lép be), 
jelszó, telefonszám, születési év, nem, lakcím, szállítási cím.
* A vásárlókat lehessen deaktiválni, így nem tudnak bejelentkezni az áruházba.
* A rendelésnél tárolni kell a megrendelt termékek azonosítóját, az aktuális árat, 
mennyiséget, a vásárló azonosítóját, a vásárló külön megjegyzését, dátumot. 
Vigyázz, a termékek tömbként fognak megjelenni a rendelésen belül, mivel egy 
rendelés során több terméket is meg lehet rendelni.
* A termékről tárolni kell: név, url (keresőbarát név), gyártó, aktív/inaktív, 
mennyiségi egység, kép, aktuális ár, szállítási határidő (pld: 2 nap, 3 hét, stb...), raktárkészlet. 
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