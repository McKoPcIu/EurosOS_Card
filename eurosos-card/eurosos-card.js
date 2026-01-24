/**
 * =============================================================================
 * Euros OS Card – Home Assistant Custom Card
 * =============================================================================
 *
 * File        : eurosos-card.js
 * Author      : Patryk "KoPcIu" Kopeć
 * GitHub      : https://github.com/McKoPcIu/EurosOS_Card
 * Custom_Card : euros_os_card
 * Version     : 0.1.1
 *
 * Description :
 * Custom Home Assistant card for EurosEnergy and E.ON devices.
 *
 * =============================================================================
 */

import { LitElement, html, css } from 'https://unpkg.com/lit@2.7.2?module';

class EurosOSCard extends LitElement {
  static properties = {
    hass: {},
    config: {}
  };

  static assets = {
    bg: {
      run_co:       `/local/eurosos-card/assets/bg-run-co.png`,
      run_cwu:      `/local/eurosos-card/assets/bg-run-cwu.png`,
      run_co_def:   `/local/eurosos-card/assets/bg-run-co-def.png`,
      run_cwu_def:  `/local/eurosos-card/assets/bg-run-cwu-def.png`,
      idle:         `/local/eurosos-card/assets/bg-idle.png`,
    },
    icons: {
      compressor:   `/local/eurosos-card/assets/compressor.png`,
      fan:          `/local/eurosos-card/assets/fan.png`,
      pump:         `/local/eurosos-card/assets/pump.png`,
    },
    fonts: {
      geogrotesque: `/local/eurosos-card/assets/Geogrotesque-Regular.woff2`,
    }
  };

  setConfig(config) {
    this.config = config;
  }

  render() {
    if (!this.config || !this.hass) return html``;

    const defs = {
      indoor_temp: 0.0,
      outdoor_temp: 0.0,
      supply_air_temp: 0.0,
      exhaust_air_temp: 0.0,
      compressor: 0,
      fan_speed: 0,
      heating_pump_speed: 0,
      heating_supply_temp: 0.0,
      heating_return_temp: 0.0,
      fluid_supply_temp: 0.0,
      fluid_return_temp: 0.0,
      co_temp: 0.0,
      cwu_temp: 0.0,
      buf_temp: 149.0,
      co_pressure: 149.0,
      cwu_pressure: 149.0
    };

    const values = {};
    for (const [key, def] of Object.entries(defs)) {
      const entity = this.config[key];
      const stateObj = entity && this.hass.states[entity];
      const val = stateObj ? parseFloat(stateObj.state) : def;
      values[key] = isNaN(val) ? def : val;
    }

    values['mode'] = this.config.mode && this.hass.states[this.config.mode] ? this.hass.states[this.config.mode].state : 'idle';
    values['cwu_pump_status'] = this.config.cwu_pump_status && this.hass.states[this.config.cwu_pump_status] ? this.hass.states[this.config.cwu_pump_status].state : 'off';
    values['defrost'] = this.config.defrost && this.hass.states[this.config.defrost] ? this.hass.states[this.config.defrost].state : 'off';

    switch(values['mode']) {
      case 'CO':  values['bg_mode'] = (values['defrost'] == 'on') ? EurosOSCard.assets.bg.run_co_def : EurosOSCard.assets.bg.run_co; break;
      case 'CWU': values['bg_mode'] = (values['defrost'] == 'on') ? EurosOSCard.assets.bg.run_cwu_def : EurosOSCard.assets.bg.run_cwu; break;
      default:    values['bg_mode'] = EurosOSCard.assets.bg.idle; 
    }

    return html`
      <ha-card>
        <style>
          @font-face {
            font-family: 'Geogrotesque';
            src: url('${EurosOSCard.assets.fonts.geogrotesque}') format('woff2');
            font-weight: normal;
            font-style: normal;
          }

          .bg {
            position: relative;
            width: 100%;
            aspect-ratio: 1179 / 1496;
            background-image: url('${values.bg_mode}');
            background-size: cover;
            background-position: center;
            border-radius: var(--ha-card-border-radius, 12px);
            overflow: hidden;
            color: white;
            font-family: 'Geogrotesque', sans-serif;
          }

          .param-small {
            position: absolute;
            font-size: calc(13px * var(--scale));
            color: #f3f6f4;
            text-shadow: 1px 1px 2px black;
          }

          .heating_pump_speed { top: 28.2%; left: 77.5%; transform: translateX(-50%); }
          .compressor { top: 28.2%; left: 52%; transform: translateX(-50%); }
          .supply_air_temp { top: 28.2%; left: 21%; transform: translateX(-50%); }
          .exhaust_air_temp { top: 52%; left: 27%; transform: translateX(-50%); }
          .fluid_supply_temp { top: 20.1%; left: 63%; transform: translateX(-50%); }
          .fan_speed { top: 57.8%; left: 26%; transform: translateX(-50%); }
          .heating_supply_temp { top: 37%; left: 88%; transform: translateX(-50%); }
          .fluid_return_temp { top: 50.3%; left: 49%; transform: translateX(-50%); }
          .heating_return_temp { top: 49.4%; left: 88%; transform: translateX(-50%); }

          .defrost { top: 57.8%; left: 49.8%; transform: translateX(-50%); color: #886ce4; }

          .param-large { 
            position: absolute;
            font-size: 140%;
            font-size: calc(18px * var(--scale));
            text-shadow: 1px 1px 2px black;
          }

          .indoor_temp { top: 6%; left: 71%; transform: translateX(-50%); }
          .outdoor_temp { top: 6%; left: 40%; transform: translateX(-50%); }
          .cwu_text { top: 75%; left: 21.5%; transform: translateX(-50%); font-weight: bold; }
          .co_text { top: 75%; left: 70.5%; transform: translateX(-50%); font-weight: bold; }
          .cwu_temp { top: 80%; left: 21.5%; transform: translateX(-50%); }
          .co_temp { top: 80%; left: 70.5%; transform: translateX(-50%); }
          .cwu_pressure { top: 87%; left: 21.5%; transform: translateX(-50%); }
          .co_pressure { top: 87%; left: 70.5%; transform: translateX(-50%); }

          .footer {
            white-space: nowrap;
            position: absolute;
            font-size: calc(9px * var(--scale));
            text-shadow: 1px 1px 2px black;
            bottom: 0%;
            left: 50%;
            transform: translateX(-50%);
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }

          .icon {
            position: absolute;
            height: auto;
            pointer-events: none;

          }

          .icon-fan { width: 23%; top: 32.5%; left: 13%; }
          .icon-co-pump { width: 7.6%; top: 32.5%; left: 73.2%; }
          .icon-cwu-pump { width: 7.6%; top: 74.4%; left: 36.9%; }
          .icon-compressor { width: 7.6%; top: 21.80%; left: 47.5%; }

          .spin {
            animation: spin 3s linear infinite;
            transform: translate(-50%, -50%);
          }
        </style>
        <div class="bg">
          <div class="param-large indoor_temp">${values.indoor_temp.toFixed(1)} °C</div>
          <div class="param-large outdoor_temp">${values.outdoor_temp.toFixed(1)} °C</div>

          <div class="param-small supply_air_temp">${values.supply_air_temp.toFixed(1)} °C</div>
          <div class="param-small exhaust_air_temp">${values.exhaust_air_temp.toFixed(1)} °C</div>
          <div class="param-small compressor">${values.compressor} Hz</div>
          <div class="param-small heating_pump_speed">${values.heating_pump_speed} %</div>
          <div class="param-small fluid_supply_temp">${values.fluid_supply_temp.toFixed(1)} °C</div>
          <div class="param-small fan_speed">${values.fan_speed} RPM</div>
          <div class="param-small heating_supply_temp">${values.heating_supply_temp.toFixed(1)} °C</div>
          <div class="param-small heating_return_temp">${values.heating_return_temp.toFixed(1)} °C</div>
          <div class="param-small fluid_return_temp">${values.fluid_return_temp.toFixed(1)} °C</div>

          <div class="param-small defrost">${values.defrost == 'on' ? 'DEFROST' : ''}</div>

          <div class="param-large cwu_text">CWU</div>
          <div class="param-large co_text">${values.buf_temp < 120.0 ? 'Bufor CO' : 'CO'}</div>
          <div class="param-large cwu_temp">${values.cwu_temp.toFixed(1)} °C</div>
          <div class="param-large co_temp">${values.buf_temp < 120.0 ? values.buf_temp.toFixed(1) : values.co_temp.toFixed(1)} °C</div>

          <div class="param-large cwu_pressure">${values.cwu_pressure < 120.0 ? `${values.cwu_pressure.toFixed(1)} bar` : ''}</div>
          <div class="param-large co_pressure">${values.co_pressure < 120.0 ? `${values.co_pressure.toFixed(1)} bar` : ''}</div>

          <img class="icon icon-fan ${values.fan_speed ? 'spin' : '' }" src="${EurosOSCard.assets.icons.fan}" />
          <img class="icon icon-compressor ${values.compressor ? 'spin' : '' }" src="${EurosOSCard.assets.icons.compressor}" />
          <img class="icon icon-co-pump ${values.heating_pump_speed ? 'spin' : '' }" src="${EurosOSCard.assets.icons.pump}" />
          <img class="icon icon-cwu-pump ${values.cwu_pump_status == 'on' ? 'spin' : '' }" src="${EurosOSCard.assets.icons.pump}" />

          <div class="footer">Grafika jest własnościa firmy Euros Energy Sp. z o.o.</div>
        </div>
      </ha-card>
    `;
  }

  firstUpdated() {
    const bg = this.renderRoot.querySelector('.bg');
    if (!bg) return;

    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      const scale = Math.max(w / 410, 0.5);

      this.style.setProperty('--scale', scale);
    });

    ro.observe(bg);
  }

}

customElements.define("eurosos-card", EurosOSCard);
