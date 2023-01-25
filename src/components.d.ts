/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { SearchEvent } from "./components/main-search-input/main-search-input";
import { AcknowledgeEvent } from "./components/my-alert/my-alert";
export namespace Components {
    interface MainSearchInput {
        "categories": { text: string; value: string; icon?: string }[];
        "suggestionsUrl": string;
    }
    interface MyAlert {
        "kind": 'info' | 'success' | 'error';
        "text": string;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface MyCountdown {
        "endDate": number;
        "name": string;
    }
}
export interface MainSearchInputCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMainSearchInputElement;
}
export interface MyAlertCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMyAlertElement;
}
declare global {
    interface HTMLMainSearchInputElement extends Components.MainSearchInput, HTMLStencilElement {
    }
    var HTMLMainSearchInputElement: {
        prototype: HTMLMainSearchInputElement;
        new (): HTMLMainSearchInputElement;
    };
    interface HTMLMyAlertElement extends Components.MyAlert, HTMLStencilElement {
    }
    var HTMLMyAlertElement: {
        prototype: HTMLMyAlertElement;
        new (): HTMLMyAlertElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLMyCountdownElement extends Components.MyCountdown, HTMLStencilElement {
    }
    var HTMLMyCountdownElement: {
        prototype: HTMLMyCountdownElement;
        new (): HTMLMyCountdownElement;
    };
    interface HTMLElementTagNameMap {
        "main-search-input": HTMLMainSearchInputElement;
        "my-alert": HTMLMyAlertElement;
        "my-component": HTMLMyComponentElement;
        "my-countdown": HTMLMyCountdownElement;
    }
}
declare namespace LocalJSX {
    interface MainSearchInput {
        "categories"?: { text: string; value: string; icon?: string }[];
        "onSearchEvent"?: (event: MainSearchInputCustomEvent<SearchEvent>) => void;
        "suggestionsUrl"?: string;
    }
    interface MyAlert {
        "kind"?: 'info' | 'success' | 'error';
        "onAcknowledge"?: (event: MyAlertCustomEvent<AcknowledgeEvent>) => void;
        "text"?: string;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface MyCountdown {
        "endDate"?: number;
        "name"?: string;
    }
    interface IntrinsicElements {
        "main-search-input": MainSearchInput;
        "my-alert": MyAlert;
        "my-component": MyComponent;
        "my-countdown": MyCountdown;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "main-search-input": LocalJSX.MainSearchInput & JSXBase.HTMLAttributes<HTMLMainSearchInputElement>;
            "my-alert": LocalJSX.MyAlert & JSXBase.HTMLAttributes<HTMLMyAlertElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "my-countdown": LocalJSX.MyCountdown & JSXBase.HTMLAttributes<HTMLMyCountdownElement>;
        }
    }
}
