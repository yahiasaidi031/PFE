import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-4LROHORE.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Injectable,
  Input,
  NgModule,
  Renderer2,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵreference,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-CDFVDSWS.js";
import "./chunk-CPNXOV62.js";

// node_modules/ngx-bootstrap/progressbar/fesm2022/ngx-bootstrap-progressbar.mjs
var _c0 = ["*"];
function ProgressbarComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0);
  }
}
function ProgressbarComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "bar", 3);
    ɵɵprojection(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("type", ctx_r0.type)("value", ctx_r0._value)("max", ctx_r0.max)("animate", ctx_r0.animate)("striped", ctx_r0.striped);
  }
}
function ProgressbarComponent_ng_template_3_bar_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "bar", 3);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r0 = ɵɵnextContext(2);
    ɵɵproperty("type", item_r2.type)("value", item_r2.value)("max", item_r2.max || ctx_r0.max)("animate", ctx_r0.animate)("striped", ctx_r0.striped);
    ɵɵadvance();
    ɵɵtextInterpolate(item_r2.label);
  }
}
function ProgressbarComponent_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵtemplate(0, ProgressbarComponent_ng_template_3_bar_0_Template, 2, 6, "bar", 4);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngForOf", ctx_r0._values);
  }
}
var _BarComponent = class _BarComponent {
  constructor(el, renderer) {
    this.el = el;
    this.renderer = renderer;
    this.max = 100;
    this.value = 0;
    this.animate = false;
    this.striped = false;
    this.type = "info";
    this.percent = 100;
  }
  ngOnChanges(changes) {
    if (changes["value"] || changes["max"]) {
      this.percent = 100 * (Number(changes["value"]?.currentValue || this.value) / Number(changes["max"]?.currentValue || this.max || 100));
    }
    if (changes["type"]) {
      this.applyTypeClasses();
    }
  }
  applyTypeClasses() {
    if (this._prevType) {
      const barTypeClass = `progress-bar-${this._prevType}`;
      const bgClass = `bg-${this._prevType}`;
      this.renderer.removeClass(this.el.nativeElement, barTypeClass);
      this.renderer.removeClass(this.el.nativeElement, bgClass);
      this._prevType = void 0;
    }
    if (this.type) {
      const barTypeClass = `progress-bar-${this.type}`;
      const bgClass = `bg-${this.type}`;
      this.renderer.addClass(this.el.nativeElement, barTypeClass);
      this.renderer.addClass(this.el.nativeElement, bgClass);
      this._prevType = this.type;
    }
  }
};
_BarComponent.ɵfac = function BarComponent_Factory(t) {
  return new (t || _BarComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
};
_BarComponent.ɵcmp = ɵɵdefineComponent({
  type: _BarComponent,
  selectors: [["bar"]],
  hostAttrs: ["role", "progressbar", "aria-valuemin", "0"],
  hostVars: 13,
  hostBindings: function BarComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("aria-valuenow", ctx.value)("aria-valuetext", ctx.percent ? ctx.percent.toFixed(0) + "%" : "")("aria-valuemax", ctx.max);
      ɵɵstyleProp("height", "100", "%")("width", ctx.percent, "%");
      ɵɵclassProp("progress-bar", true)("progress-bar-animated", ctx.animate)("progress-bar-striped", ctx.striped);
    }
  },
  inputs: {
    max: "max",
    value: "value",
    animate: "animate",
    striped: "striped",
    type: "type"
  },
  features: [ɵɵNgOnChangesFeature],
  ngContentSelectors: _c0,
  decls: 1,
  vars: 0,
  template: function BarComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
var BarComponent = _BarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BarComponent, [{
    type: Component,
    args: [{
      selector: "bar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        role: "progressbar",
        "aria-valuemin": "0",
        "[class.progress-bar]": "true",
        "[class.progress-bar-animated]": "animate",
        "[class.progress-bar-striped]": "striped",
        "[attr.aria-valuenow]": "value",
        "[attr.aria-valuetext]": 'percent ? percent.toFixed(0) + "%" : ""',
        "[attr.aria-valuemax]": "max",
        "[style.height.%]": '"100"',
        "[style.width.%]": "percent"
      },
      template: "<ng-content></ng-content>\n"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }];
  }, {
    max: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    animate: [{
      type: Input
    }],
    striped: [{
      type: Input
    }],
    type: [{
      type: Input
    }]
  });
})();
var _ProgressbarConfig = class _ProgressbarConfig {
  constructor() {
    this.animate = false;
    this.max = 100;
  }
};
_ProgressbarConfig.ɵfac = function ProgressbarConfig_Factory(t) {
  return new (t || _ProgressbarConfig)();
};
_ProgressbarConfig.ɵprov = ɵɵdefineInjectable({
  token: _ProgressbarConfig,
  factory: _ProgressbarConfig.ɵfac,
  providedIn: "root"
});
var ProgressbarConfig = _ProgressbarConfig;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressbarConfig, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var _ProgressbarComponent = class _ProgressbarComponent {
  /** current value of progress bar. Could be a number or array of objects
   * like {"value":15,"type":"info","label":"15 %"}
   */
  set value(value) {
    this.isStacked = Array.isArray(value);
    if (typeof value === "number") {
      this._value = value;
      this._values = void 0;
    } else {
      this._value = void 0;
      this._values = value;
    }
  }
  constructor(config) {
    this.max = 100;
    this.animate = false;
    this.striped = false;
    this.isStacked = false;
    this._value = 0;
    Object.assign(this, config);
  }
};
_ProgressbarComponent.ɵfac = function ProgressbarComponent_Factory(t) {
  return new (t || _ProgressbarComponent)(ɵɵdirectiveInject(ProgressbarConfig));
};
_ProgressbarComponent.ɵcmp = ɵɵdefineComponent({
  type: _ProgressbarComponent,
  selectors: [["progressbar"]],
  hostVars: 3,
  hostBindings: function ProgressbarComponent_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("max", ctx.max);
      ɵɵclassProp("progress", true);
    }
  },
  inputs: {
    max: "max",
    animate: "animate",
    striped: "striped",
    type: "type",
    value: "value"
  },
  ngContentSelectors: _c0,
  decls: 5,
  vars: 3,
  consts: [["NotStacked", ""], ["Stacked", ""], [4, "ngIf", "ngIfThen", "ngIfElse"], [3, "type", "value", "max", "animate", "striped"], [3, "type", "value", "max", "animate", "striped", 4, "ngFor", "ngForOf"]],
  template: function ProgressbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵtemplate(0, ProgressbarComponent_ng_container_0_Template, 1, 0, "ng-container", 2)(1, ProgressbarComponent_ng_template_1_Template, 2, 5, "ng-template", null, 0, ɵɵtemplateRefExtractor)(3, ProgressbarComponent_ng_template_3_Template, 1, 1, "ng-template", null, 1, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const NotStacked_r3 = ɵɵreference(2);
      const Stacked_r4 = ɵɵreference(4);
      ɵɵproperty("ngIf", !ctx.isStacked)("ngIfThen", NotStacked_r3)("ngIfElse", Stacked_r4);
    }
  },
  dependencies: [NgForOf, NgIf, BarComponent],
  styles: ["[_nghost-%COMP%]{width:100%;display:flex}"],
  changeDetection: 0
});
var ProgressbarComponent = _ProgressbarComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressbarComponent, [{
    type: Component,
    args: [{
      selector: "progressbar",
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "[class.progress]": "true",
        "[attr.max]": "max"
      },
      template: '<ng-container *ngIf="!isStacked then NotStacked else Stacked"></ng-container>\n\n<ng-template #NotStacked>\n  <bar [type]="type" [value]="_value" [max]="max" [animate]="animate" [striped]="striped">\n    <ng-content></ng-content>\n  </bar>\n</ng-template>\n\n<ng-template #Stacked>\n  <bar *ngFor="let item of _values"\n       [type]="item.type" [value]="item.value" [max]="item.max || max" [animate]="animate" [striped]="striped">{{ item.label }}</bar>\n</ng-template>\n',
      styles: [":host{width:100%;display:flex}\n"]
    }]
  }], function() {
    return [{
      type: ProgressbarConfig
    }];
  }, {
    max: [{
      type: Input
    }],
    animate: [{
      type: Input
    }],
    striped: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    value: [{
      type: Input
    }]
  });
})();
var _ProgressbarModule = class _ProgressbarModule {
  static forRoot() {
    return {
      ngModule: _ProgressbarModule,
      providers: []
    };
  }
};
_ProgressbarModule.ɵfac = function ProgressbarModule_Factory(t) {
  return new (t || _ProgressbarModule)();
};
_ProgressbarModule.ɵmod = ɵɵdefineNgModule({
  type: _ProgressbarModule,
  declarations: [BarComponent, ProgressbarComponent],
  imports: [CommonModule],
  exports: [BarComponent, ProgressbarComponent]
});
_ProgressbarModule.ɵinj = ɵɵdefineInjector({
  imports: [CommonModule]
});
var ProgressbarModule = _ProgressbarModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressbarModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [BarComponent, ProgressbarComponent],
      exports: [BarComponent, ProgressbarComponent]
    }]
  }], null, null);
})();
export {
  BarComponent,
  ProgressbarComponent,
  ProgressbarConfig,
  ProgressbarModule
};
//# sourceMappingURL=ngx-bootstrap_progressbar.js.map
