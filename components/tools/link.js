import React, { PureComponent } from "react";

/**
 * props 对象内容
 * alt: "javaSynchronized原理.png"
 * src: "/api/files/bace05e84e4eb616e550f46cd16296a4.png"
 */
class KnowMeLink extends PureComponent { 
    render() {
        return (
            <a>{this.props.value}</a>
        );
    }
}

export default KnowMeLink;