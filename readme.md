<a href="https://buycoffee.to/kopciu" target="_blank" rel="noopener noreferrer">
  <img src="https://kopciu.info/coffee.png" alt="BuyCoffee.to – Postaw kawę">
</a>

# EurosOS Card

Custom Lovelace card dla wizualizacji pompy ciepła Euros Energy / E-On.

## Funkcje
- Wyświetlanie temperatury wewnętrznej i zewnętrznej
- Wyświetlanie temperatur CWU i CO
- Status kompresora, pompy CO i wentylatora (RPM)
- Animacja ikon (wentylator, pompa, kompresor)

## Instalacja ręczna
1. Skopiuj cały katalog `eurosos-card/` (z plikiem `eurosos-card.js` i katalogiem `assets/`) do:
```
/config/www/
```
2. W menu **Konfiguracja → Lovelace → Zasoby (Resources)** dodaj:
```
URL: /local/eurosos-card/eurosos-card.js
Typ: Moduł JavaScript
```
3.  Dodaj kartę w Lovelace
* Wybierz **niestandardowa karta (Custom card)**
* Wpisz:
```yaml
type: custom:eurosos-card
outdoor_temp: sensor.temp_zewnetrzna
indoor_temp: sensor.temp_wewnetrzna
supply_air_temp: sensor.temp_powietrza_zasysanego
exhaust_air_temp: sensor.temp_powietrza_wyrzucanego
compressor: sensor.czestotliwosc_sprezarki
fan_speed: sensor.predkosc_wentylatora_1
heating_pump_speed: sensor.pompa_obiegu_grzewczego
heating_supply_temp: sensor.temp_obiegu_grzewczego_pc
heating_return_temp: sensor.temp_powrotu_obiegu_grzewczego_pc
fluid_supply_temp: sensor.temp_wejsciowa_czynnika
fluid_return_temp: sensor.temp_wyjsciowa_czynnika
co_temp: sensor.temp_obiegu_grzewczego_pc
cwu_temp: sensor.temp_zbiornika_cwu
mode: sensor.stan_pracy
cwu_pump_status: switch.wymuszenie_pracy_pompy_cyrkulacyjnej
buf_temp: sensor.temp_zbiornika_buforowego
```
> Konfiguracja dla integracji EurosOS, jeśli dane pobierasz inaczej - edytuj zmienne.

## Wsparcie
- Grupa E-On na FB: [Pompy Ciepła E.ON Air Euros Atmo DIY](https://www.facebook.com/groups/1068907574414311?locale=pl_PL)
- Repozytorium GitHub: [Repozytorium](https://github.com/McKoPcIu/Euros_OS_Card)
- Błędy i sugestie można zgłaszać bezpośrednio w GitHub.

## Licencja
© Euros Energy Sp. z o.o. — wszystkie grafiki są własnością firmy. Kod udostępniany na licencji MIT.

