// navigation.d.ts
import { Product } from '@/path-to-your-product-interface-file';

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      product: { category?: string; company?: string };
      ProductDetails: { product: Product };
      search: undefined;
      order: undefined;
      // Add other routes here
    }
  }
}


export type RootParamList = ReactNavigation.RootParamList;
