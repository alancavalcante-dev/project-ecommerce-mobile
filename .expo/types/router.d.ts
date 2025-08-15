/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/components/ProductCard`; params?: Router.UnknownInputParams; } | { pathname: `/produtos`; params?: Router.UnknownInputParams; } | { pathname: `/produtos/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/`; params?: Router.UnknownOutputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `/components/ProductCard`; params?: Router.UnknownOutputParams; } | { pathname: `/produtos`; params?: Router.UnknownOutputParams; } | { pathname: `/produtos/[id]`, params: Router.UnknownOutputParams & { id: string; } };
      href: Router.RelativePathString | Router.ExternalPathString | `/${`?${string}` | `#${string}` | ''}` | `/_sitemap${`?${string}` | `#${string}` | ''}` | `/components/ProductCard${`?${string}` | `#${string}` | ''}` | `/produtos${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/`; params?: Router.UnknownInputParams; } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `/components/ProductCard`; params?: Router.UnknownInputParams; } | { pathname: `/produtos`; params?: Router.UnknownInputParams; } | `/produtos/${Router.SingleRoutePart<T>}${`?${string}` | `#${string}` | ''}` | { pathname: `/produtos/[id]`, params: Router.UnknownInputParams & { id: string | number; } };
    }
  }
}
