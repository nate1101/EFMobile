import React, { Component } from 'react';
import { View, Animated } from 'react-native';

class AnimatedLogo extends Component {
    componentWillMount() {
        this.position = new Animated.ValueXY({ x: 0, y: 0 });
        Animated.spring(this.position, {
            toValue: { x: 250, y: 10 }
        }).start();
    }

    render() {
        return (
            <Animated.View style={this.position.getLayout()}>
                <View style={styles.square} />
            </Animated.View>
        );
    }
}

const styles = {
    square: {
        width: 120,
        height: 120,
        backgroundColor: '#00BCD4'
    }
};
export default AnimatedLogo;
