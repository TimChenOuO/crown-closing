import React from "react";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";

import "./preview-collections.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CollectionItem from "../collection-item/Collection-item";

// -----------arrow component config for react-slick-------
// import { ReactComponent as NextIcon } from "./next.svg";
// import { ReactComponent as PrevIcon } from "./back.svg";

const NextArrow = ({ onClick }) => (
    <button onClick={onClick} className="next-arrow">
        &#10095;
    </button>
);
const PrevArrow = ({ onClick }) => (
    <button onClick={onClick} className="prev-arrow">
        &#10094;
    </button>
);

// ----------------------------------

const Test = ({ title, items, routeName, match, history }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 768, //max-width
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="collection-preview">
            <h1
                className="title"
                onClick={() => history.push(`${match.path}/${routeName}`)}
            >
                {title}
            </h1>

            <Slider {...settings}>
                {items.map(item => (
                    <CollectionItem key={item.id} item={item} />
                ))}
            </Slider>
        </div>
    );
};

export default withRouter(Test);
