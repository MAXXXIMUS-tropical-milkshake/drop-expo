import React, {Dispatch, SetStateAction} from "react";
import {Text, View} from "react-native";
import Modal from 'react-native-modal';

export type FiltersModalProps = {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
}
export default function FiltersModal({visible, setVisible}: FiltersModalProps): React.JSX.Element {
    console.log("modal open");
    return (
        <Modal

            animationIn={"slideInUp"}
            style={{padding: 0, margin: 0}}
            isVisible={visible}
            onSwipeComplete={() => setVisible(false)}
            swipeDirection={'down'}
            swipeThreshold={200}
            onBackdropPress={() => setVisible(false)}
        >
            <View style={{
                height: "50%",
                width: "100%",
                backgroundColor: 'rgba(43,48,156,0.4)',
                borderTopRightRadius: 18,
                borderTopLeftRadius: 18,
                position: 'absolute',
                bottom: 0,
            }}
                  onTouchEnd={() => setVisible(false)}>
                <Text>LOLKEK</Text>
            </View>
        </Modal>);
}