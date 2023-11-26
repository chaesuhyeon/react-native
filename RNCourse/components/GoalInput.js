import { useState } from "react";
import { StyleSheet, View, TextInput, Button } from "react-native";
function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState("");
    function goalInputHandler(enterdText) {
        setEnteredGoalText(enterdText);
    }

    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText("");
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder="Your course goal!"
                onChangeText={goalInputHandler}
                value={enteredGoalText}
            />
            <Button title="Add Goal" onPress={addGoalHandler} />
        </View>
    );
}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    textInput: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 1,
        width: "70%",
        marginRight: 8,
        padding: 8,
    },
});
