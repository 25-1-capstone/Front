import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { ITodo } from "../../types/common";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<ITodo[]>([
    { id: "1", text: "React Native 학습하기", completed: false },
    { id: "2", text: "알고리즘 문제 풀기", completed: true },
    { id: "3", text: "영어 단어 암기하기", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const todo: ITodo = {
        id: Date.now().toString(),
        text: newTodo.trim(),
        completed: false,
      };
      setTodos([...todos, todo]);
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>오늘의 할 일</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="할 일을 입력하세요"
          returnKeyType="done"
          onSubmitEditing={handleAddTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTodo}>
          <Text style={styles.addButtonText}>추가</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.list}>
        {todos.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.todoItem}
            onPress={() => handleToggleTodo(item.id)}
          >
            <View style={[styles.checkbox, item.completed && styles.checked]} />
            <Text
              style={[
                styles.todoText,
                item.completed && styles.completedTodoText,
              ]}
            >
              {item.text}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  list: {
    flex: 1,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#4CAF50",
    marginRight: 12,
  },
  checked: {
    backgroundColor: "#4CAF50",
  },
  todoText: {
    fontSize: 16,
  },
  completedTodoText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
});

export default TodoList;
