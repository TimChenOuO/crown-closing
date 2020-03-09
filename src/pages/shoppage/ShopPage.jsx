import React from "react";

import PreviewCollections from "../../components/preview-collections/Preview-collections";
import { SHOP_DATA } from "./shop-data";

class ShopPage extends React.Component {
    state = {
        collections: SHOP_DATA
    };

    render() {
        const { collections } = this.state;
        return (
            <div className="shop-page">
                {collections.map(({ id, ...otherProps }) => (
                    <PreviewCollections key={id} {...otherProps} />
                ))}
            </div>
        );
    }
}

export default ShopPage;
