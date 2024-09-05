import {
  FaIconComponent,
  FontAwesomeModule
} from "./chunk-ZDZISWXU.js";
import {
  Meta
} from "./chunk-JTMK6W3X.js";
import "./chunk-MARCDE62.js";
import {
  AsyncPipe,
  CommonModule,
  DOCUMENT,
  NgForOf,
  NgIf,
  isPlatformBrowser
} from "./chunk-4LROHORE.js";
import {
  BehaviorSubject,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  EMPTY,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  InputFlags,
  NgModule,
  NgZone,
  Observable,
  Optional,
  Output,
  PLATFORM_ID,
  Subject,
  Subscription,
  delay,
  map,
  of,
  setClassMetadata,
  take,
  takeUntil,
  tap,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassMapInterpolate1,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-CDFVDSWS.js";
import {
  __spreadValues
} from "./chunk-CPNXOV62.js";

// node_modules/@angular/cdk/fesm2022/platform.mjs
var hasV8BreakIterator;
try {
  hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}
var _Platform = class _Platform {
  constructor(_platformId) {
    this._platformId = _platformId;
    this.isBrowser = this._platformId ? isPlatformBrowser(this._platformId) : typeof document === "object" && !!document;
    this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
    this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
    this.BLINK = this.isBrowser && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !this.EDGE && !this.TRIDENT;
    this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
    this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
    this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
    this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
    this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
  }
};
_Platform.ɵfac = function Platform_Factory(t) {
  return new (t || _Platform)(ɵɵinject(PLATFORM_ID));
};
_Platform.ɵprov = ɵɵdefineInjectable({
  token: _Platform,
  factory: _Platform.ɵfac,
  providedIn: "root"
});
var Platform = _Platform;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Platform, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: Object,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], null);
})();
var _PlatformModule = class _PlatformModule {
};
_PlatformModule.ɵfac = function PlatformModule_Factory(t) {
  return new (t || _PlatformModule)();
};
_PlatformModule.ɵmod = ɵɵdefineNgModule({
  type: _PlatformModule
});
_PlatformModule.ɵinj = ɵɵdefineInjector({});
var PlatformModule = _PlatformModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();
var RtlScrollAxisType;
(function(RtlScrollAxisType2) {
  RtlScrollAxisType2[RtlScrollAxisType2["NORMAL"] = 0] = "NORMAL";
  RtlScrollAxisType2[RtlScrollAxisType2["NEGATED"] = 1] = "NEGATED";
  RtlScrollAxisType2[RtlScrollAxisType2["INVERTED"] = 2] = "INVERTED";
})(RtlScrollAxisType || (RtlScrollAxisType = {}));

// node_modules/@angular/cdk/fesm2022/clipboard.mjs
var PendingCopy = class {
  constructor(text, _document) {
    this._document = _document;
    const textarea = this._textarea = this._document.createElement("textarea");
    const styles = textarea.style;
    styles.position = "fixed";
    styles.top = styles.opacity = "0";
    styles.left = "-999em";
    textarea.setAttribute("aria-hidden", "true");
    textarea.value = text;
    textarea.readOnly = true;
    (this._document.fullscreenElement || this._document.body).appendChild(textarea);
  }
  /** Finishes copying the text. */
  copy() {
    const textarea = this._textarea;
    let successful = false;
    try {
      if (textarea) {
        const currentFocus = this._document.activeElement;
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        successful = this._document.execCommand("copy");
        if (currentFocus) {
          currentFocus.focus();
        }
      }
    } catch {
    }
    return successful;
  }
  /** Cleans up DOM changes used to perform the copy operation. */
  destroy() {
    const textarea = this._textarea;
    if (textarea) {
      textarea.remove();
      this._textarea = void 0;
    }
  }
};
var _Clipboard = class _Clipboard {
  constructor(document2) {
    this._document = document2;
  }
  /**
   * Copies the provided text into the user's clipboard.
   *
   * @param text The string to copy.
   * @returns Whether the operation was successful.
   */
  copy(text) {
    const pendingCopy = this.beginCopy(text);
    const successful = pendingCopy.copy();
    pendingCopy.destroy();
    return successful;
  }
  /**
   * Prepares a string to be copied later. This is useful for large strings
   * which take too long to successfully render and be copied in the same tick.
   *
   * The caller must call `destroy` on the returned `PendingCopy`.
   *
   * @param text The string to copy.
   * @returns the pending copy operation.
   */
  beginCopy(text) {
    return new PendingCopy(text, this._document);
  }
};
_Clipboard.ɵfac = function Clipboard_Factory(t) {
  return new (t || _Clipboard)(ɵɵinject(DOCUMENT));
};
_Clipboard.ɵprov = ɵɵdefineInjectable({
  token: _Clipboard,
  factory: _Clipboard.ɵfac,
  providedIn: "root"
});
var Clipboard = _Clipboard;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Clipboard, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }], null);
})();
var CDK_COPY_TO_CLIPBOARD_CONFIG = new InjectionToken("CDK_COPY_TO_CLIPBOARD_CONFIG");
var _CdkCopyToClipboard = class _CdkCopyToClipboard {
  constructor(_clipboard, _ngZone, config) {
    this._clipboard = _clipboard;
    this._ngZone = _ngZone;
    this.text = "";
    this.attempts = 1;
    this.copied = new EventEmitter();
    this._pending = /* @__PURE__ */ new Set();
    if (config && config.attempts != null) {
      this.attempts = config.attempts;
    }
  }
  /** Copies the current text to the clipboard. */
  copy(attempts = this.attempts) {
    if (attempts > 1) {
      let remainingAttempts = attempts;
      const pending = this._clipboard.beginCopy(this.text);
      this._pending.add(pending);
      const attempt = () => {
        const successful = pending.copy();
        if (!successful && --remainingAttempts && !this._destroyed) {
          this._currentTimeout = this._ngZone.runOutsideAngular(() => setTimeout(attempt, 1));
        } else {
          this._currentTimeout = null;
          this._pending.delete(pending);
          pending.destroy();
          this.copied.emit(successful);
        }
      };
      attempt();
    } else {
      this.copied.emit(this._clipboard.copy(this.text));
    }
  }
  ngOnDestroy() {
    if (this._currentTimeout) {
      clearTimeout(this._currentTimeout);
    }
    this._pending.forEach((copy) => copy.destroy());
    this._pending.clear();
    this._destroyed = true;
  }
};
_CdkCopyToClipboard.ɵfac = function CdkCopyToClipboard_Factory(t) {
  return new (t || _CdkCopyToClipboard)(ɵɵdirectiveInject(Clipboard), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(CDK_COPY_TO_CLIPBOARD_CONFIG, 8));
};
_CdkCopyToClipboard.ɵdir = ɵɵdefineDirective({
  type: _CdkCopyToClipboard,
  selectors: [["", "cdkCopyToClipboard", ""]],
  hostBindings: function CdkCopyToClipboard_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function CdkCopyToClipboard_click_HostBindingHandler() {
        return ctx.copy();
      });
    }
  },
  inputs: {
    text: [InputFlags.None, "cdkCopyToClipboard", "text"],
    attempts: [InputFlags.None, "cdkCopyToClipboardAttempts", "attempts"]
  },
  outputs: {
    copied: "cdkCopyToClipboardCopied"
  },
  standalone: true
});
var CdkCopyToClipboard = _CdkCopyToClipboard;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkCopyToClipboard, [{
    type: Directive,
    args: [{
      selector: "[cdkCopyToClipboard]",
      host: {
        "(click)": "copy()"
      },
      standalone: true
    }]
  }], () => [{
    type: Clipboard
  }, {
    type: NgZone
  }, {
    type: void 0,
    decorators: [{
      type: Optional
    }, {
      type: Inject,
      args: [CDK_COPY_TO_CLIPBOARD_CONFIG]
    }]
  }], {
    text: [{
      type: Input,
      args: ["cdkCopyToClipboard"]
    }],
    attempts: [{
      type: Input,
      args: ["cdkCopyToClipboardAttempts"]
    }],
    copied: [{
      type: Output,
      args: ["cdkCopyToClipboardCopied"]
    }]
  });
})();
var _ClipboardModule = class _ClipboardModule {
};
_ClipboardModule.ɵfac = function ClipboardModule_Factory(t) {
  return new (t || _ClipboardModule)();
};
_ClipboardModule.ɵmod = ɵɵdefineNgModule({
  type: _ClipboardModule,
  imports: [CdkCopyToClipboard],
  exports: [CdkCopyToClipboard]
});
_ClipboardModule.ɵinj = ɵɵdefineInjector({});
var ClipboardModule = _ClipboardModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ClipboardModule, [{
    type: NgModule,
    args: [{
      imports: [CdkCopyToClipboard],
      exports: [CdkCopyToClipboard]
    }]
  }], null, null);
})();

// node_modules/ngx-sharebuttons/fesm2022/ngx-sharebuttons.mjs
var SHARE_BUTTONS_CONFIG = new InjectionToken("shareButtonsConfig");
var SharerMethod;
(function(SharerMethod2) {
  SharerMethod2["Anchor"] = "anchor";
  SharerMethod2["Window"] = "window";
})(SharerMethod || (SharerMethod = {}));
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function mergeDeep(target, ...sources) {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) {
          Object.assign(target, {
            [key]: {}
          });
        }
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }
  return mergeDeep(target, ...sources);
}
function getValidUrl(url, fallbackUrl) {
  if (url) {
    const r = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (r.test(url)) {
      return url;
    }
    console.warn(`[ShareButtons]: Sharing link '${url}' is invalid!`);
  }
  return fallbackUrl;
}
function printPage() {
  return new Observable((sub) => document.defaultView.print());
}
function copyToClipboard({
  params,
  data,
  clipboard,
  updater
}) {
  return of(null).pipe(tap(() => {
    clipboard.copy(params.url);
    updater.next({
      icon: data.successIcon,
      text: data.successText,
      disabled: true
    });
  }), delay(data.delay), tap(() => updater.next({
    icon: data.icon,
    text: data.text,
    disabled: false
  })), take(1));
}
var linkInDescription = {
  description: (p) => {
    return p.description ? `${p.description}\r
${p.url}` : p.url;
  }
};
var SHARE_BUTTONS = {
  facebook: {
    type: "facebook",
    text: "Facebook",
    ariaLabel: "Share on Facebook",
    icon: ["fab", "facebook-f"],
    color: "#4267B2",
    share: {
      desktop: "https://www.facebook.com/sharer/sharer.php?"
    },
    params: {
      url: "u"
    }
  },
  twitter: {
    type: "twitter",
    text: "Twitter",
    ariaLabel: "Share on Twitter",
    icon: ["fab", "twitter"],
    color: "#00acee",
    share: {
      desktop: "https://twitter.com/intent/tweet?"
    },
    params: {
      url: "url",
      description: "text",
      tags: "hashtags",
      via: "via"
    }
  },
  linkedin: {
    type: "linkedin",
    text: "LinkedIn",
    ariaLabel: "Share on LinkedIn",
    icon: ["fab", "linkedin-in"],
    color: "#006fa6",
    share: {
      desktop: "https://www.linkedin.com/shareArticle?"
    },
    params: {
      url: "url",
      title: "title",
      description: "summary"
    }
  },
  pinterest: {
    type: "pinterest",
    text: "Pinterest",
    ariaLabel: "Share on Pinterest",
    icon: ["fab", "pinterest-p"],
    color: "#BD091D",
    share: {
      desktop: "https://pinterest.com/pin/create/button/?"
    },
    params: {
      url: "url",
      description: "description",
      image: "media"
    }
  },
  reddit: {
    type: "reddit",
    text: "Reddit",
    ariaLabel: "Share on Reddit",
    icon: ["fab", "reddit-alien"],
    color: "#FF4006",
    share: {
      desktop: "https://www.reddit.com/submit?"
    },
    params: {
      url: "url",
      title: "title"
    }
  },
  tumblr: {
    type: "tumblr",
    text: "Tumblr",
    ariaLabel: "Share on Tumblr",
    icon: ["fab", "tumblr"],
    color: "#36465D",
    share: {
      desktop: "https://tumblr.com/widgets/share/tool?"
    },
    params: {
      url: "canonicalUrl",
      description: "caption",
      tags: "tags"
    }
  },
  mix: {
    type: "mix",
    text: "Mix",
    ariaLabel: "Share on Mix",
    icon: ["fab", "mix"],
    color: "#eb4924",
    share: {
      desktop: "https://mix.com/add?"
    },
    params: {
      url: "url"
    }
  },
  viber: {
    type: "viber",
    text: "Viber",
    ariaLabel: "Share on Viber",
    icon: ["fab", "viber"],
    color: "#665ca7",
    share: {
      android: "viber://forward?",
      ios: "viber://forward?"
    },
    params: {
      description: "text"
    },
    paramsFunc: linkInDescription
  },
  vk: {
    type: "vk",
    text: "VKontakte",
    ariaLabel: "Share on VKontakte",
    icon: ["fab", "vk"],
    color: "#4C75A3",
    share: {
      desktop: "https://vk.com/share.php?"
    },
    params: {
      url: "url"
    }
  },
  telegram: {
    type: "telegram",
    text: "Telegram",
    ariaLabel: "Share on Telegram",
    icon: ["fab", "telegram-plane"],
    color: "#0088cc",
    share: {
      desktop: "https://t.me/share/url?"
    },
    params: {
      url: "url",
      description: "text"
    }
  },
  messenger: {
    type: "messenger",
    text: "Messenger",
    ariaLabel: "Share on Messenger",
    icon: ["fab", "facebook-messenger"],
    color: "#0080FF",
    share: {
      desktop: "https://www.facebook.com/dialog/send?",
      android: "fb-messenger://share/?",
      ios: "fb-messenger://share/?"
    },
    params: {
      url: "link",
      appId: "app_id",
      redirectUrl: "redirect_uri"
    }
  },
  whatsapp: {
    type: "whatsapp",
    text: "WhatsApp",
    ariaLabel: "Share on WhatsApp",
    icon: ["fab", "whatsapp"],
    color: "#25D366",
    share: {
      desktop: "https://api.whatsapp.com/send?",
      android: "whatsapp://send?",
      ios: "https://api.whatsapp.com/send?"
    },
    params: {
      url: "link",
      description: "text"
    },
    paramsFunc: linkInDescription
  },
  xing: {
    type: "xing",
    text: "Xing",
    ariaLabel: "Share on Xing",
    icon: ["fab", "xing"],
    color: "#006567",
    share: {
      desktop: "https://www.xing.com/spi/shares/new?"
    },
    params: {
      url: "url"
    }
  },
  line: {
    type: "line",
    text: "Line",
    ariaLabel: "Share on Line",
    icon: ["fab", "line"],
    color: "#00b900",
    share: {
      desktop: "https://social-plugins.line.me/lineit/share?"
    },
    params: {
      url: "url"
    }
  },
  sms: {
    type: "sms",
    text: "SMS",
    ariaLabel: "Share link via SMS",
    icon: ["fas", "sms"],
    color: "#20c16c",
    share: {
      desktop: "sms:?",
      ios: "sms:&"
    },
    params: {
      description: "body"
    },
    paramsFunc: linkInDescription
  },
  email: {
    type: "email",
    text: "Email",
    ariaLabel: "Share link via email",
    icon: ["fas", "envelope"],
    color: "#FF961C",
    share: {
      desktop: "mailto:?"
    },
    params: {
      title: "subject",
      description: "body"
    },
    paramsFunc: linkInDescription
  },
  print: {
    type: "print",
    text: "Print",
    ariaLabel: "Print page",
    icon: ["fas", "print"],
    color: "#765AA2",
    func: printPage
  },
  copy: {
    type: "copy",
    text: "Copy link",
    ariaLabel: "Copy link",
    icon: ["fas", "link"],
    color: "#607D8B",
    data: {
      text: "Copy link",
      icon: ["fas", "link"],
      successText: "Copied",
      successIcon: ["fas", "check"],
      delay: 2e3
    },
    func: copyToClipboard
  }
};
var _ShareService = class _ShareService {
  constructor(config, _document) {
    this._document = _document;
    this.config = {
      sharerMethod: SharerMethod.Anchor,
      sharerTarget: "_blank",
      windowObj: this._document.defaultView,
      windowFuncName: "open",
      prop: SHARE_BUTTONS,
      theme: "default",
      include: [],
      exclude: [],
      autoSetMeta: true,
      windowWidth: 800,
      windowHeight: 500,
      moreButtonIcon: "ellipsis-h",
      lessButtonIcon: "minus",
      moreButtonAriaLabel: "Show more share buttons",
      lessButtonAriaLabel: "Show less share buttons"
    };
    this.config$ = new BehaviorSubject(this.config);
    if (config) {
      this.setConfig(config);
    }
  }
  /**
   * Share buttons properties, used to get the text, color and icon of each button.
   */
  get prop() {
    return this.config.prop;
  }
  get windowSize() {
    return `width=${this.config.windowWidth}, height=${this.config.windowHeight}`;
  }
  setConfig(config) {
    this.config = mergeDeep(this.config, config);
    this.config$.next(this.config);
  }
  addButton(name, props) {
    this.setConfig({
      prop: {
        [name]: props
      }
    });
  }
};
_ShareService.ɵfac = function ShareService_Factory(t) {
  return new (t || _ShareService)(ɵɵinject(SHARE_BUTTONS_CONFIG, 8), ɵɵinject(DOCUMENT));
};
_ShareService.ɵprov = ɵɵdefineInjectable({
  token: _ShareService,
  factory: _ShareService.ɵfac,
  providedIn: "root"
});
var ShareService = _ShareService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShareService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], function() {
    return [{
      type: void 0,
      decorators: [{
        type: Optional
      }, {
        type: Inject,
        args: [SHARE_BUTTONS_CONFIG]
      }]
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, null);
})();
var _ShareDirective = class _ShareDirective {
  constructor(_el, _meta, _platform, _clipboard, _share, _cd, _document) {
    this._meta = _meta;
    this._platform = _platform;
    this._clipboard = _clipboard;
    this._share = _share;
    this._cd = _cd;
    this._document = _document;
    this._destroyed = new Subject();
    this._updater = new Subject();
    this.autoSetMeta = this._share.config.autoSetMeta;
    this.url = this._share.config.url;
    this.title = this._share.config.title;
    this.description = this._share.config.description;
    this.image = this._share.config.image;
    this.tags = this._share.config.tags;
    this.redirectUrl = this._share.config.redirectUrl;
    this.opened = new EventEmitter();
    this.closed = new EventEmitter();
    this._el = _el.nativeElement;
  }
  /**
   * Share the link
   */
  share() {
    if (this._platform.isBrowser && this.shareButton) {
      const params = this.autoSetMeta ? this.getParamsFromMetaTags() : this.getParamsFromInputs();
      const click = this.shareButton.share ? this.open(params) : this.shareButton.func({
        params,
        data: this.shareButton.data,
        clipboard: this._clipboard,
        updater: this._updater
      });
      click.pipe(takeUntil(this._destroyed)).subscribe();
    } else {
      console.warn(`${this.text} button is not compatible on this Platform`);
    }
  }
  ngOnInit() {
    this._updater.pipe(tap((data) => {
      this.icon = data.icon;
      this.text = data.text;
      this._el.style.pointerEvents = data.disabled ? "none" : "auto";
      this._cd.markForCheck();
    }), takeUntil(this._destroyed)).subscribe();
  }
  ngOnChanges(changes) {
    if (this._platform.isBrowser) {
      if (this._shareButtonChanged(changes.shareButtonName)) {
        this._createShareButton();
      }
      if (this._urlChanged(changes.url)) {
        this.url = getValidUrl(this.autoSetMeta ? this.url || this._getMetaTagContent("og:url") : this.url, this._document.defaultView.location.href);
      }
    }
  }
  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }
  _createShareButton() {
    const button = this._share.config.prop[this.shareButtonName];
    if (button) {
      this.shareButton = button;
      this._el.classList.remove(`sb-${this._buttonClass}`);
      this._el.classList.add(`sb-${this.shareButtonName}`);
      this._el.style.setProperty("--button-color", this.shareButton.color);
      this._buttonClass = this.shareButtonName;
      this.color = this.shareButton.color;
      this.text = this.shareButton.text;
      this.icon = this.shareButton.icon;
      this._el.setAttribute("aria-label", button.ariaLabel);
    } else {
      console.error(`[ShareButtons]: The share button '${this.shareButtonName}' does not exist!`);
    }
  }
  /**
   * Get meta tag content
   */
  _getMetaTagContent(key) {
    const metaUsingProperty = this._meta.getTag(`property="${key}"`);
    if (metaUsingProperty) {
      return metaUsingProperty.getAttribute("content");
    }
    const metaUsingName = this._meta.getTag(`name="${key}"`);
    if (metaUsingName) {
      return metaUsingName.getAttribute("content");
    }
  }
  _shareButtonChanged(change) {
    return change && (change.firstChange || change.previousValue !== change.currentValue);
  }
  _urlChanged(change) {
    return !this.url || change && change.previousValue !== change.currentValue;
  }
  /**
   * Get share params from meta tags first and fallback to user inputs
   */
  getParamsFromMetaTags() {
    return {
      url: this.url,
      title: this.title || this._getMetaTagContent("og:title"),
      description: this.description || this._getMetaTagContent("og:description"),
      image: this.image || this._getMetaTagContent("og:image"),
      via: this._share.config.twitterAccount,
      tags: this.tags,
      appId: this._share.config.appId || this._getMetaTagContent("fb:app_id"),
      redirectUrl: this.redirectUrl || this.url
    };
  }
  /**
   * Get share params from user inputs
   */
  getParamsFromInputs() {
    return {
      url: this.url,
      title: this.title,
      description: this.description,
      image: this.image,
      tags: this.tags,
      via: this._share.config.twitterAccount,
      appId: this._share.config.appId,
      redirectUrl: this.redirectUrl || this.url
    };
  }
  open(params) {
    let sharerLink;
    if (this._platform.IOS && this.shareButton.share.ios) {
      sharerLink = this.shareButton.share.ios;
    } else if (this._platform.ANDROID && this.shareButton.share.android) {
      sharerLink = this.shareButton.share.android;
    } else {
      sharerLink = this.shareButton.share.desktop;
    }
    if (sharerLink) {
      this._finalUrl = sharerLink + this._serializeParams(params);
      if (this._share.config.debug) {
        console.log("[DEBUG SHARE BUTTON]: ", this._finalUrl);
      }
      const sharerMethod = this.shareButton.method || this._share.config.sharerMethod;
      const sharerTarget = this.shareButton.target || this._share.config.sharerTarget;
      switch (sharerMethod) {
        case SharerMethod.Anchor:
          const linkElement = this._document.createElement("a");
          linkElement.setAttribute("target", sharerTarget);
          linkElement.setAttribute("rel", "noopener noreferrer");
          linkElement.href = this._finalUrl;
          linkElement.click();
          linkElement.remove();
          break;
        case SharerMethod.Window:
          const openWindow = this._share.config.windowObj[this._share.config.windowFuncName];
          const popUpWindow = openWindow(this._finalUrl, sharerTarget, this._share.windowSize);
          this._share.config.windowObj.opener = null;
          if (popUpWindow) {
            return new Observable((sub) => {
              const pollTimer = this._document.defaultView.setInterval(() => {
                if (popUpWindow.closed) {
                  this._document.defaultView.clearInterval(pollTimer);
                  this.closed.emit(this.shareButtonName);
                  sub.next();
                  sub.complete();
                }
              }, 200);
            });
          }
          break;
      }
      this.opened.emit(this.shareButtonName);
    }
    return EMPTY;
  }
  _serializeParams(params) {
    return Object.entries(this.shareButton.params).map(([key, value]) => {
      const paramFunc = this.shareButton.paramsFunc ? this.shareButton.paramsFunc[key] : null;
      if (params[key] || paramFunc) {
        const paramValue = paramFunc ? paramFunc(params) : params[key];
        return `${value}=${encodeURIComponent(paramValue)}`;
      }
      return "";
    }).filter((urlParam) => urlParam !== "").join("&");
  }
};
_ShareDirective.ɵfac = function ShareDirective_Factory(t) {
  return new (t || _ShareDirective)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Meta), ɵɵdirectiveInject(Platform), ɵɵdirectiveInject(Clipboard), ɵɵdirectiveInject(ShareService), ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(DOCUMENT));
};
_ShareDirective.ɵdir = ɵɵdefineDirective({
  type: _ShareDirective,
  selectors: [["", "shareButton", ""]],
  hostBindings: function ShareDirective_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function ShareDirective_click_HostBindingHandler() {
        return ctx.share();
      });
    }
  },
  inputs: {
    shareButtonName: [InputFlags.None, "shareButton", "shareButtonName"],
    autoSetMeta: "autoSetMeta",
    url: "url",
    title: "title",
    description: "description",
    image: "image",
    tags: "tags",
    redirectUrl: "redirectUrl"
  },
  outputs: {
    opened: "opened",
    closed: "closed"
  },
  exportAs: ["shareButton"],
  features: [ɵɵNgOnChangesFeature]
});
var ShareDirective = _ShareDirective;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShareDirective, [{
    type: Directive,
    args: [{
      selector: "[shareButton]",
      exportAs: "shareButton"
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Meta
    }, {
      type: Platform
    }, {
      type: Clipboard
    }, {
      type: ShareService
    }, {
      type: ChangeDetectorRef
    }, {
      type: void 0,
      decorators: [{
        type: Inject,
        args: [DOCUMENT]
      }]
    }];
  }, {
    shareButtonName: [{
      type: Input,
      args: ["shareButton"]
    }],
    autoSetMeta: [{
      type: Input
    }],
    url: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    description: [{
      type: Input
    }],
    image: [{
      type: Input
    }],
    tags: [{
      type: Input
    }],
    redirectUrl: [{
      type: Input
    }],
    opened: [{
      type: Output
    }],
    closed: [{
      type: Output
    }],
    share: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _ShareModule = class _ShareModule {
  static withConfig(config) {
    return {
      ngModule: _ShareModule,
      providers: [{
        provide: SHARE_BUTTONS_CONFIG,
        useValue: config
      }]
    };
  }
};
_ShareModule.ɵfac = function ShareModule_Factory(t) {
  return new (t || _ShareModule)();
};
_ShareModule.ɵmod = ɵɵdefineNgModule({
  type: _ShareModule,
  declarations: [ShareDirective],
  imports: [PlatformModule, ClipboardModule],
  exports: [ShareDirective]
});
_ShareModule.ɵinj = ɵɵdefineInjector({
  imports: [PlatformModule, ClipboardModule]
});
var ShareModule = _ShareModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShareModule, [{
    type: NgModule,
    args: [{
      imports: [PlatformModule, ClipboardModule],
      declarations: [ShareDirective],
      exports: [ShareDirective]
    }]
  }], null, null);
})();

// node_modules/ngx-sharebuttons/fesm2022/ngx-sharebuttons-button.mjs
function ShareButton_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 6);
    ɵɵelement(1, "fa-icon", 7);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    const btn_r3 = ɵɵreference(1);
    ɵɵadvance();
    ɵɵproperty("icon", ctx_r1.icon || btn_r3.icon)("fixedWidth", true);
  }
}
function ShareButton_div_2_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 8);
    ɵɵtext(1);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext(2);
    const btn_r3 = ɵɵreference(1);
    ɵɵadvance();
    ɵɵtextInterpolate1(" ", ctx_r1.text || btn_r3.text, " ");
  }
}
function ShareButton_div_2_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div", 3);
    ɵɵtemplate(1, ShareButton_div_2_div_1_Template, 2, 2, "div", 4)(2, ShareButton_div_2_div_2_Template, 2, 1, "div", 5);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = ɵɵnextContext();
    const btn_r3 = ɵɵreference(1);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showIcon && btn_r3.icon);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r1.showText);
  }
}
var _ShareButton = class _ShareButton {
  /** Set theme as button class */
  get buttonClass() {
    return `sb-button sb-${this.theme}`;
  }
  constructor(_share) {
    this._share = _share;
    this.redirectUrl = this._share.config.redirectUrl;
    this.showIcon = true;
    this.showText = false;
    this.theme = this._share.config.theme;
    this.opened = new EventEmitter();
    this.closed = new EventEmitter();
  }
};
_ShareButton.ɵfac = function ShareButton_Factory(t) {
  return new (t || _ShareButton)(ɵɵdirectiveInject(ShareService));
};
_ShareButton.ɵcmp = ɵɵdefineComponent({
  type: _ShareButton,
  selectors: [["share-button"]],
  hostVars: 2,
  hostBindings: function ShareButton_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵclassMap(ctx.buttonClass);
    }
  },
  inputs: {
    button: "button",
    url: "url",
    title: "title",
    description: "description",
    image: "image",
    tags: "tags",
    redirectUrl: "redirectUrl",
    autoSetMeta: "autoSetMeta",
    showIcon: "showIcon",
    showText: "showText",
    text: "text",
    icon: "icon",
    theme: "theme",
    disabled: "disabled"
  },
  outputs: {
    opened: "opened",
    closed: "closed"
  },
  decls: 3,
  vars: 14,
  consts: [["btn", "shareButton"], ["type", "button", 1, "sb-wrapper", 3, "opened", "closed", "shareButton", "url", "image", "title", "description", "tags", "redirectUrl", "autoSetMeta", "disabled"], ["class", "sb-content", 4, "ngIf"], [1, "sb-content"], ["class", "sb-icon", 4, "ngIf"], ["class", "sb-text", 4, "ngIf"], [1, "sb-icon"], [3, "icon", "fixedWidth"], [1, "sb-text"]],
  template: function ShareButton_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = ɵɵgetCurrentView();
      ɵɵelementStart(0, "button", 1, 0);
      ɵɵlistener("opened", function ShareButton_Template_button_opened_0_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.opened.emit($event));
      })("closed", function ShareButton_Template_button_closed_0_listener($event) {
        ɵɵrestoreView(_r1);
        return ɵɵresetView(ctx.closed.emit($event));
      });
      ɵɵtemplate(2, ShareButton_div_2_Template, 3, 2, "div", 2);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      const btn_r3 = ɵɵreference(1);
      ɵɵclassProp("sb-show-icon", ctx.showIcon)("sb-show-text", ctx.showText);
      ɵɵproperty("shareButton", ctx.button)("url", ctx.url)("image", ctx.image)("title", ctx.title)("description", ctx.description)("tags", ctx.tags)("redirectUrl", ctx.redirectUrl)("autoSetMeta", ctx.autoSetMeta)("disabled", ctx.disabled);
      ɵɵadvance(2);
      ɵɵproperty("ngIf", btn_r3);
    }
  },
  dependencies: [ShareDirective, FaIconComponent, NgIf],
  styles: ["[button=facebook][_nghost-%COMP%], [button=facebook]   [_nghost-%COMP%]{--button-color: #4267B2}[button=twitter][_nghost-%COMP%], [button=twitter]   [_nghost-%COMP%]{--button-color: #00acee}[button=google][_nghost-%COMP%], [button=google]   [_nghost-%COMP%]{--button-color: #db4437}[button=mix][_nghost-%COMP%], [button=mix]   [_nghost-%COMP%]{--button-color: #ff8226}[button=line][_nghost-%COMP%], [button=line]   [_nghost-%COMP%]{--button-color: #00b900}[button=linkedin][_nghost-%COMP%], [button=linkedin]   [_nghost-%COMP%]{--button-color: #006fa6}[button=pinterest][_nghost-%COMP%], [button=pinterest]   [_nghost-%COMP%]{--button-color: #bd081c}[button=reddit][_nghost-%COMP%], [button=reddit]   [_nghost-%COMP%]{--button-color: #ff4006}[button=tumblr][_nghost-%COMP%], [button=tumblr]   [_nghost-%COMP%]{--button-color: #36465d}[button=whatsapp][_nghost-%COMP%], [button=whatsapp]   [_nghost-%COMP%]{--button-color: #25d366}[button=messenger][_nghost-%COMP%], [button=messenger]   [_nghost-%COMP%]{--button-color: #0080FF}[button=telegram][_nghost-%COMP%], [button=telegram]   [_nghost-%COMP%]{--button-color: #0088cc}[button=xing][_nghost-%COMP%], [button=xing]   [_nghost-%COMP%]{--button-color: #006567}[button=sms][_nghost-%COMP%], [button=sms]   [_nghost-%COMP%]{--button-color: #20c16c}[button=email][_nghost-%COMP%], [button=email]   [_nghost-%COMP%]{--button-color: #FF961C}[button=viber][_nghost-%COMP%], [button=viber]   [_nghost-%COMP%]{--button-color: #665ca7}[button=vk][_nghost-%COMP%], [button=vk]   [_nghost-%COMP%]{--button-color: #4C75A3}[button=copy][_nghost-%COMP%], [button=copy]   [_nghost-%COMP%]{--button-color: #607D8B}[button=print][_nghost-%COMP%], [button=print]   [_nghost-%COMP%]{--button-color: #765AA2}[button=expand][_nghost-%COMP%], [button=expand]   [_nghost-%COMP%]{--button-color: #FF6651}button[_ngcontent-%COMP%]{cursor:pointer;position:relative;outline:0;-webkit-print-color-adjust:exact;margin:var(--sb-margin, .3125em);padding:var(--sb-padding, 0);min-width:var(--sb-min-width, 4.125em);height:var(--sb-height, 2.5em);color:var(--sb-color, #fff);background:var(--sb-background);font-size:var(--sb-font-size, 13px);line-height:var(--sb-line-height, 2.571em);border:var(--sb-border);border-radius:var(--sb-border-radius);transition:var(--sb-transition);box-shadow:var(--sb-box-shadow);text-shadow:var(--sb-text-shadow);overflow:var(--sb-overflow)}.sb-icon[_ngcontent-%COMP%], .sb-text[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;-webkit-user-select:none;-moz-user-select:none;user-select:none}.sb-content[_ngcontent-%COMP%]{flex:1;display:flex;height:100%;width:100%;position:relative}.sb-text[_ngcontent-%COMP%]{flex:1;height:100%;white-space:nowrap;padding:var(--sb-text-padding, 0 .7em);font-weight:var(--sb-font-weight, bold)}.sb-icon[_ngcontent-%COMP%]{text-align:center;width:100%;height:100%;min-width:2em;font-size:var(--sb-icon-size, 1.2em)}"],
  changeDetection: 0
});
var ShareButton = _ShareButton;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShareButton, [{
    type: Component,
    args: [{
      selector: "share-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<button #btn="shareButton"\r\n        type="button"\r\n        class="sb-wrapper"\r\n        [class.sb-show-icon]="showIcon"\r\n        [class.sb-show-text]="showText"\r\n        [shareButton]="button"\r\n        [url]="url"\r\n        [image]="image"\r\n        [title]="title"\r\n        [description]="description"\r\n        [tags]="tags"\r\n        [redirectUrl]="redirectUrl"\r\n        [autoSetMeta]="autoSetMeta"\r\n        [disabled]="disabled"\r\n        (opened)="opened.emit($event)"\r\n        (closed)="closed.emit($event)">\r\n\r\n  <div *ngIf="btn" class="sb-content">\r\n\r\n    <div *ngIf="showIcon && btn.icon" class="sb-icon">\r\n      <fa-icon [icon]="icon || btn.icon" [fixedWidth]="true"></fa-icon>\r\n    </div>\r\n\r\n    <div *ngIf="showText" class="sb-text">\r\n      {{ text || btn.text }}\r\n    </div>\r\n\r\n  </div>\r\n</button>\r\n',
      styles: [":host-context([button=facebook]){--button-color: #4267B2}:host-context([button=twitter]){--button-color: #00acee}:host-context([button=google]){--button-color: #db4437}:host-context([button=mix]){--button-color: #ff8226}:host-context([button=line]){--button-color: #00b900}:host-context([button=linkedin]){--button-color: #006fa6}:host-context([button=pinterest]){--button-color: #bd081c}:host-context([button=reddit]){--button-color: #ff4006}:host-context([button=tumblr]){--button-color: #36465d}:host-context([button=whatsapp]){--button-color: #25d366}:host-context([button=messenger]){--button-color: #0080FF}:host-context([button=telegram]){--button-color: #0088cc}:host-context([button=xing]){--button-color: #006567}:host-context([button=sms]){--button-color: #20c16c}:host-context([button=email]){--button-color: #FF961C}:host-context([button=viber]){--button-color: #665ca7}:host-context([button=vk]){--button-color: #4C75A3}:host-context([button=copy]){--button-color: #607D8B}:host-context([button=print]){--button-color: #765AA2}:host-context([button=expand]){--button-color: #FF6651}button{cursor:pointer;position:relative;outline:0;-webkit-print-color-adjust:exact;margin:var(--sb-margin, .3125em);padding:var(--sb-padding, 0);min-width:var(--sb-min-width, 4.125em);height:var(--sb-height, 2.5em);color:var(--sb-color, #fff);background:var(--sb-background);font-size:var(--sb-font-size, 13px);line-height:var(--sb-line-height, 2.571em);border:var(--sb-border);border-radius:var(--sb-border-radius);transition:var(--sb-transition);box-shadow:var(--sb-box-shadow);text-shadow:var(--sb-text-shadow);overflow:var(--sb-overflow)}.sb-icon,.sb-text{display:flex;align-items:center;justify-content:center;-webkit-user-select:none;-moz-user-select:none;user-select:none}.sb-content{flex:1;display:flex;height:100%;width:100%;position:relative}.sb-text{flex:1;height:100%;white-space:nowrap;padding:var(--sb-text-padding, 0 .7em);font-weight:var(--sb-font-weight, bold)}.sb-icon{text-align:center;width:100%;height:100%;min-width:2em;font-size:var(--sb-icon-size, 1.2em)}\n"]
    }]
  }], function() {
    return [{
      type: ShareService
    }];
  }, {
    button: [{
      type: Input
    }],
    url: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    description: [{
      type: Input
    }],
    image: [{
      type: Input
    }],
    tags: [{
      type: Input
    }],
    redirectUrl: [{
      type: Input
    }],
    autoSetMeta: [{
      type: Input
    }],
    showIcon: [{
      type: Input
    }],
    showText: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    theme: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    opened: [{
      type: Output
    }],
    closed: [{
      type: Output
    }],
    buttonClass: [{
      type: HostBinding,
      args: ["class"]
    }]
  });
})();
var _ShareButtonModule = class _ShareButtonModule {
  static withConfig(config) {
    return {
      ngModule: _ShareButtonModule,
      providers: [{
        provide: SHARE_BUTTONS_CONFIG,
        useValue: config
      }]
    };
  }
};
_ShareButtonModule.ɵfac = function ShareButtonModule_Factory(t) {
  return new (t || _ShareButtonModule)();
};
_ShareButtonModule.ɵmod = ɵɵdefineNgModule({
  type: _ShareButtonModule,
  declarations: [ShareButton],
  imports: [ShareModule, FontAwesomeModule, CommonModule],
  exports: [ShareModule, FontAwesomeModule, ShareButton]
});
_ShareButtonModule.ɵinj = ɵɵdefineInjector({
  imports: [ShareModule, FontAwesomeModule, CommonModule, ShareModule, FontAwesomeModule]
});
var ShareButtonModule = _ShareButtonModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShareButtonModule, [{
    type: NgModule,
    args: [{
      declarations: [ShareButton],
      imports: [ShareModule, FontAwesomeModule, CommonModule],
      exports: [ShareModule, FontAwesomeModule, ShareButton]
    }]
  }], null, null);
})();

// node_modules/ngx-sharebuttons/fesm2022/ngx-sharebuttons-buttons.mjs
function ShareButtons_div_0_share_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "share-button", 3);
    ɵɵlistener("opened", function ShareButtons_div_0_share_button_1_Template_share_button_opened_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.opened.emit($event));
    })("closed", function ShareButtons_div_0_share_button_1_Template_share_button_closed_0_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.closed.emit($event));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const button_r3 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext(2);
    ɵɵproperty("button", button_r3)("theme", ctx_r1.theme)("url", ctx_r1.url)("title", ctx_r1.title)("description", ctx_r1.description)("image", ctx_r1.image)("tags", ctx_r1.tags)("redirectUrl", ctx_r1.redirectUrl)("autoSetMeta", ctx_r1.autoSetMeta)("showIcon", ctx_r1.showIcon)("showText", ctx_r1.showText)("disabled", ctx_r1.disabled);
  }
}
function ShareButtons_div_0_expand_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "expand-button", 4);
    ɵɵlistener("toggle", function ShareButtons_div_0_expand_button_2_Template_expand_button_toggle_0_listener($event) {
      ɵɵrestoreView(_r4);
      const ctx_r1 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r1.updateState({
        expanded: $event
      }));
    });
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const state_r5 = ɵɵnextContext().$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("sb-button sb-", ctx_r1.theme, "");
    ɵɵproperty("expanded", state_r5.expanded)("moreIcon", state_r5.moreIcon)("lessIcon", state_r5.lessIcon)("moreAriaLabel", state_r5.moreAriaLabel)("lessAriaLabel", state_r5.lessAriaLabel);
  }
}
function ShareButtons_div_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "div");
    ɵɵtemplate(1, ShareButtons_div_0_share_button_1_Template, 1, 12, "share-button", 1)(2, ShareButtons_div_0_expand_button_2_Template, 1, 8, "expand-button", 2);
    ɵɵelementEnd();
  }
  if (rf & 2) {
    const state_r5 = ctx.$implicit;
    const ctx_r1 = ɵɵnextContext();
    ɵɵclassMapInterpolate1("sb-group sb-", ctx_r1.theme, "");
    ɵɵadvance();
    ɵɵproperty("ngForOf", state_r5.selectedButtons);
    ɵɵadvance();
    ɵɵproperty("ngIf", state_r5.shownCount < state_r5.userButtons.length);
  }
}
var _ExpandButton = class _ExpandButton {
  constructor(el) {
    this.toggle = new EventEmitter();
    el.nativeElement.style.setProperty("--button-color", "#FF6651");
  }
};
_ExpandButton.ɵfac = function ExpandButton_Factory(t) {
  return new (t || _ExpandButton)(ɵɵdirectiveInject(ElementRef));
};
_ExpandButton.ɵcmp = ɵɵdefineComponent({
  type: _ExpandButton,
  selectors: [["expand-button"]],
  inputs: {
    moreIcon: "moreIcon",
    lessIcon: "lessIcon",
    expanded: "expanded",
    moreAriaLabel: "moreAriaLabel",
    lessAriaLabel: "lessAriaLabel"
  },
  outputs: {
    toggle: "toggle"
  },
  decls: 4,
  vars: 2,
  consts: [[1, "sb-wrapper", "sb-expand", "sb-show-icon", 3, "click"], [1, "sb-content"], [1, "sb-icon"], [3, "icon"]],
  template: function ExpandButton_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "button", 0);
      ɵɵlistener("click", function ExpandButton_Template_button_click_0_listener() {
        return ctx.toggle.emit(!ctx.expanded);
      });
      ɵɵelementStart(1, "div", 1)(2, "div", 2);
      ɵɵelement(3, "fa-icon", 3);
      ɵɵelementEnd()()();
    }
    if (rf & 2) {
      ɵɵattribute("aria-label", ctx.expanded ? ctx.lessAriaLabel : ctx.moreAriaLabel);
      ɵɵadvance(3);
      ɵɵproperty("icon", ctx.expanded ? ctx.lessIcon : ctx.moreIcon);
    }
  },
  dependencies: [FaIconComponent],
  styles: ["[button=facebook][_nghost-%COMP%], [button=facebook]   [_nghost-%COMP%]{--button-color: #4267B2}[button=twitter][_nghost-%COMP%], [button=twitter]   [_nghost-%COMP%]{--button-color: #00acee}[button=google][_nghost-%COMP%], [button=google]   [_nghost-%COMP%]{--button-color: #db4437}[button=mix][_nghost-%COMP%], [button=mix]   [_nghost-%COMP%]{--button-color: #ff8226}[button=line][_nghost-%COMP%], [button=line]   [_nghost-%COMP%]{--button-color: #00b900}[button=linkedin][_nghost-%COMP%], [button=linkedin]   [_nghost-%COMP%]{--button-color: #006fa6}[button=pinterest][_nghost-%COMP%], [button=pinterest]   [_nghost-%COMP%]{--button-color: #bd081c}[button=reddit][_nghost-%COMP%], [button=reddit]   [_nghost-%COMP%]{--button-color: #ff4006}[button=tumblr][_nghost-%COMP%], [button=tumblr]   [_nghost-%COMP%]{--button-color: #36465d}[button=whatsapp][_nghost-%COMP%], [button=whatsapp]   [_nghost-%COMP%]{--button-color: #25d366}[button=messenger][_nghost-%COMP%], [button=messenger]   [_nghost-%COMP%]{--button-color: #0080FF}[button=telegram][_nghost-%COMP%], [button=telegram]   [_nghost-%COMP%]{--button-color: #0088cc}[button=xing][_nghost-%COMP%], [button=xing]   [_nghost-%COMP%]{--button-color: #006567}[button=sms][_nghost-%COMP%], [button=sms]   [_nghost-%COMP%]{--button-color: #20c16c}[button=email][_nghost-%COMP%], [button=email]   [_nghost-%COMP%]{--button-color: #FF961C}[button=viber][_nghost-%COMP%], [button=viber]   [_nghost-%COMP%]{--button-color: #665ca7}[button=vk][_nghost-%COMP%], [button=vk]   [_nghost-%COMP%]{--button-color: #4C75A3}[button=copy][_nghost-%COMP%], [button=copy]   [_nghost-%COMP%]{--button-color: #607D8B}[button=print][_nghost-%COMP%], [button=print]   [_nghost-%COMP%]{--button-color: #765AA2}[button=expand][_nghost-%COMP%], [button=expand]   [_nghost-%COMP%]{--button-color: #FF6651}button[_ngcontent-%COMP%]{cursor:pointer;position:relative;outline:0;-webkit-print-color-adjust:exact;margin:var(--sb-margin, .3125em);padding:var(--sb-padding, 0);min-width:var(--sb-min-width, 4.125em);height:var(--sb-height, 2.5em);color:var(--sb-color, #fff);background:var(--sb-background);font-size:var(--sb-font-size, 13px);line-height:var(--sb-line-height, 2.571em);border:var(--sb-border);border-radius:var(--sb-border-radius);transition:var(--sb-transition);box-shadow:var(--sb-box-shadow);text-shadow:var(--sb-text-shadow);overflow:var(--sb-overflow)}.sb-icon[_ngcontent-%COMP%], .sb-text[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;-webkit-user-select:none;-moz-user-select:none;user-select:none}.sb-content[_ngcontent-%COMP%]{flex:1;display:flex;height:100%;width:100%;position:relative}.sb-text[_ngcontent-%COMP%]{flex:1;height:100%;white-space:nowrap;padding:var(--sb-text-padding, 0 .7em);font-weight:var(--sb-font-weight, bold)}.sb-icon[_ngcontent-%COMP%]{text-align:center;width:100%;height:100%;min-width:2em;font-size:var(--sb-icon-size, 1.2em)}"],
  changeDetection: 0
});
var ExpandButton = _ExpandButton;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ExpandButton, [{
    type: Component,
    args: [{
      selector: "expand-button",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: `
    <button class="sb-wrapper sb-expand sb-show-icon"
            [attr.aria-label]="expanded ? lessAriaLabel : moreAriaLabel"
            (click)="toggle.emit(!expanded)">

      <div class="sb-content">
        <div class="sb-icon">
          <fa-icon [icon]="expanded ? lessIcon : moreIcon"></fa-icon>
        </div>
      </div>
    </button>
  `,
      styles: [":host-context([button=facebook]){--button-color: #4267B2}:host-context([button=twitter]){--button-color: #00acee}:host-context([button=google]){--button-color: #db4437}:host-context([button=mix]){--button-color: #ff8226}:host-context([button=line]){--button-color: #00b900}:host-context([button=linkedin]){--button-color: #006fa6}:host-context([button=pinterest]){--button-color: #bd081c}:host-context([button=reddit]){--button-color: #ff4006}:host-context([button=tumblr]){--button-color: #36465d}:host-context([button=whatsapp]){--button-color: #25d366}:host-context([button=messenger]){--button-color: #0080FF}:host-context([button=telegram]){--button-color: #0088cc}:host-context([button=xing]){--button-color: #006567}:host-context([button=sms]){--button-color: #20c16c}:host-context([button=email]){--button-color: #FF961C}:host-context([button=viber]){--button-color: #665ca7}:host-context([button=vk]){--button-color: #4C75A3}:host-context([button=copy]){--button-color: #607D8B}:host-context([button=print]){--button-color: #765AA2}:host-context([button=expand]){--button-color: #FF6651}button{cursor:pointer;position:relative;outline:0;-webkit-print-color-adjust:exact;margin:var(--sb-margin, .3125em);padding:var(--sb-padding, 0);min-width:var(--sb-min-width, 4.125em);height:var(--sb-height, 2.5em);color:var(--sb-color, #fff);background:var(--sb-background);font-size:var(--sb-font-size, 13px);line-height:var(--sb-line-height, 2.571em);border:var(--sb-border);border-radius:var(--sb-border-radius);transition:var(--sb-transition);box-shadow:var(--sb-box-shadow);text-shadow:var(--sb-text-shadow);overflow:var(--sb-overflow)}.sb-icon,.sb-text{display:flex;align-items:center;justify-content:center;-webkit-user-select:none;-moz-user-select:none;user-select:none}.sb-content{flex:1;display:flex;height:100%;width:100%;position:relative}.sb-text{flex:1;height:100%;white-space:nowrap;padding:var(--sb-text-padding, 0 .7em);font-weight:var(--sb-font-weight, bold)}.sb-icon{text-align:center;width:100%;height:100%;min-width:2em;font-size:var(--sb-icon-size, 1.2em)}\n"]
    }]
  }], function() {
    return [{
      type: ElementRef
    }];
  }, {
    moreIcon: [{
      type: Input
    }],
    lessIcon: [{
      type: Input
    }],
    expanded: [{
      type: Input
    }],
    moreAriaLabel: [{
      type: Input
    }],
    lessAriaLabel: [{
      type: Input
    }],
    toggle: [{
      type: Output
    }]
  });
})();
var _ShareButtons = class _ShareButtons {
  constructor(_share) {
    this._share = _share;
    this._state$ = new BehaviorSubject({
      includedButtons: [],
      excludedButtons: [],
      userButtons: [],
      selectedButtons: [],
      expanded: true,
      shownCount: Object.keys(SHARE_BUTTONS).length
    });
    this._configSub$ = Subscription.EMPTY;
    this.theme = this._share.config.theme;
    this.redirectUrl = this._share.config.redirectUrl;
    this.showIcon = true;
    this.showText = false;
    this.opened = new EventEmitter();
    this.closed = new EventEmitter();
  }
  ngOnInit() {
    this.state$ = this._state$.pipe(map((state) => {
      const includedButtons = state.includedButtons && state.includedButtons.length ? state.includedButtons : state.userButtons;
      const userButtons = state.excludedButtons ? includedButtons.filter((btn) => state.excludedButtons.indexOf(btn) < 0) : includedButtons;
      const selectedButtons = userButtons.slice(0, state.expanded ? userButtons.length : state.shownCount);
      return {
        userButtons,
        selectedButtons,
        expanded: state.expanded,
        shownCount: state.shownCount,
        moreIcon: state.moreIcon,
        lessIcon: state.lessIcon,
        moreAriaLabel: state.moreAriaLabel,
        lessAriaLabel: state.lessAriaLabel
      };
    }));
    this._configSub$ = this._share.config$.subscribe((config) => {
      const includedButtons = config.include.length ? config.include : Object.keys(SHARE_BUTTONS);
      const userButtons = includedButtons.filter((btn) => config.exclude.indexOf(btn) < 0);
      this.updateState({
        userButtons,
        expanded: false,
        moreIcon: config.moreButtonIcon,
        lessIcon: config.lessButtonIcon,
        moreAriaLabel: config.moreButtonAriaLabel,
        lessAriaLabel: config.lessButtonAriaLabel
      });
    });
  }
  ngOnChanges(changes) {
    const shouldUpdate = changes["include"] && changes["include"].currentValue !== changes["include"].previousValue || changes["exclude"] && changes["exclude"].currentValue !== changes["exclude"].previousValue || changes["show"] && changes["show"].currentValue !== changes["show"].previousValue;
    if (shouldUpdate) {
      this.updateState({
        includedButtons: this.include,
        excludedButtons: this.exclude,
        shownCount: this.show
      });
    }
  }
  ngOnDestroy() {
    this._configSub$.unsubscribe();
    this._state$.complete();
  }
  updateState(state) {
    this._state$.next(__spreadValues(__spreadValues({}, this._state$.value), state));
  }
};
_ShareButtons.ɵfac = function ShareButtons_Factory(t) {
  return new (t || _ShareButtons)(ɵɵdirectiveInject(ShareService));
};
_ShareButtons.ɵcmp = ɵɵdefineComponent({
  type: _ShareButtons,
  selectors: [["share-buttons"]],
  inputs: {
    theme: "theme",
    include: "include",
    exclude: "exclude",
    show: "show",
    url: "url",
    title: "title",
    description: "description",
    image: "image",
    tags: "tags",
    redirectUrl: "redirectUrl",
    autoSetMeta: "autoSetMeta",
    showIcon: "showIcon",
    showText: "showText",
    disabled: "disabled"
  },
  outputs: {
    opened: "opened",
    closed: "closed"
  },
  features: [ɵɵNgOnChangesFeature],
  decls: 2,
  vars: 3,
  consts: [[3, "class", 4, "ngIf"], [3, "button", "theme", "url", "title", "description", "image", "tags", "redirectUrl", "autoSetMeta", "showIcon", "showText", "disabled", "opened", "closed", 4, "ngFor", "ngForOf"], [3, "class", "expanded", "moreIcon", "lessIcon", "moreAriaLabel", "lessAriaLabel", "toggle", 4, "ngIf"], [3, "opened", "closed", "button", "theme", "url", "title", "description", "image", "tags", "redirectUrl", "autoSetMeta", "showIcon", "showText", "disabled"], [3, "toggle", "expanded", "moreIcon", "lessIcon", "moreAriaLabel", "lessAriaLabel"]],
  template: function ShareButtons_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, ShareButtons_div_0_Template, 3, 5, "div", 0);
      ɵɵpipe(1, "async");
    }
    if (rf & 2) {
      ɵɵproperty("ngIf", ɵɵpipeBind1(1, 1, ctx.state$));
    }
  },
  dependencies: [ShareButton, NgForOf, NgIf, ExpandButton, AsyncPipe],
  styles: ["[_nghost-%COMP%]{display:inherit}.sb-group[_ngcontent-%COMP%], .sb-button[_ngcontent-%COMP%]{display:inline-flex;align-items:flex-start}.sb-group[_ngcontent-%COMP%]{flex-wrap:wrap}"],
  changeDetection: 0
});
var ShareButtons = _ShareButtons;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShareButtons, [{
    type: Component,
    args: [{
      selector: "share-buttons",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<div *ngIf="state$ | async; let state" class="sb-group sb-{{theme}}">\r\n  <share-button *ngFor="let button of state.selectedButtons"\r\n                [button]="button"\r\n                [theme]="theme"\r\n                [url]="url"\r\n                [title]="title"\r\n                [description]="description"\r\n                [image]="image"\r\n                [tags]="tags"\r\n                [redirectUrl]="redirectUrl"\r\n                [autoSetMeta]="autoSetMeta"\r\n                [showIcon]="showIcon"\r\n                [showText]="showText"\r\n                (opened)="opened.emit($event)"\r\n                (closed)="closed.emit($event)"\r\n                [disabled]="disabled">\r\n  </share-button>\r\n  <expand-button *ngIf="state.shownCount < state.userButtons.length"\r\n                 class="sb-button sb-{{theme}}"\r\n                 [expanded]="state.expanded"\r\n                 [moreIcon]="state.moreIcon"\r\n                 [lessIcon]="state.lessIcon"\r\n                 [moreAriaLabel]="state.moreAriaLabel"\r\n                 [lessAriaLabel]="state.lessAriaLabel"\r\n                 (toggle)="updateState({expanded: $event})">\r\n  </expand-button>\r\n</div>\r\n',
      styles: [":host{display:inherit}.sb-group,.sb-button{display:inline-flex;align-items:flex-start}.sb-group{flex-wrap:wrap}\n"]
    }]
  }], function() {
    return [{
      type: ShareService
    }];
  }, {
    theme: [{
      type: Input
    }],
    include: [{
      type: Input
    }],
    exclude: [{
      type: Input
    }],
    show: [{
      type: Input
    }],
    url: [{
      type: Input
    }],
    title: [{
      type: Input
    }],
    description: [{
      type: Input
    }],
    image: [{
      type: Input
    }],
    tags: [{
      type: Input
    }],
    redirectUrl: [{
      type: Input
    }],
    autoSetMeta: [{
      type: Input
    }],
    showIcon: [{
      type: Input
    }],
    showText: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    opened: [{
      type: Output
    }],
    closed: [{
      type: Output
    }]
  });
})();
var _ShareButtonsModule = class _ShareButtonsModule {
  static withConfig(config) {
    return {
      ngModule: _ShareButtonsModule,
      providers: [{
        provide: SHARE_BUTTONS_CONFIG,
        useValue: config
      }]
    };
  }
};
_ShareButtonsModule.ɵfac = function ShareButtonsModule_Factory(t) {
  return new (t || _ShareButtonsModule)();
};
_ShareButtonsModule.ɵmod = ɵɵdefineNgModule({
  type: _ShareButtonsModule,
  declarations: [ShareButtons, ExpandButton],
  imports: [ShareButtonModule, CommonModule],
  exports: [ShareButtonModule, ShareButtons]
});
_ShareButtonsModule.ɵinj = ɵɵdefineInjector({
  imports: [ShareButtonModule, CommonModule, ShareButtonModule]
});
var ShareButtonsModule = _ShareButtonsModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ShareButtonsModule, [{
    type: NgModule,
    args: [{
      declarations: [ShareButtons, ExpandButton],
      imports: [ShareButtonModule, CommonModule],
      exports: [ShareButtonModule, ShareButtons]
    }]
  }], null, null);
})();
export {
  ShareButtons,
  ShareButtonsModule
};
//# sourceMappingURL=ngx-sharebuttons_buttons.js.map
