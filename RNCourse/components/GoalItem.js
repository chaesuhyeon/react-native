import { StyleSheet, View, Text } from "react-native";
function GoalItem(props) {
    return (
        <View style={styles.goalItem}>
            <Text style={styles.goalText}>
                {props.text}
                {/* item은 내장되어 있는 변수명 */}
            </Text>
        </View>
    );
}

export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,
        padding: 8,
        borderRadius: 6,
        backgroundColor: "#5e0acc",
    },
    goalText: {
        color: "white",
    },
});
