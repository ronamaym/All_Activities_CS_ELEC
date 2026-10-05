/* Activity: User Input and FlatList
===> by: Rona May M. Payos - BSCS3B */

// ---------------------------
// if it doesnt work, rename this file from Payos_RonaMay_BSCS3B.tsx => index.tsx
// Combination of the UI Grocery list and the stylesheet
// ---------------------------

// ---------------------------
// IMPORTS (USING DESTRUCTURING)
// ---------------------------
// useState is for the data that changes (the list and the text being typed).
import { useState } from "react";
// the React Native components used in this screen, StyleSheet is for the styles below.
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// ---------------------------
// TYPE
// ---------------------------
// this describes how one grocery item looks like, so TypeScript can warn me
// if i forget a property or use the wrong one.
type GroceryItem = {
  id: string;
  name: string;
  bought: boolean;
};

// ---------------------------
// CONST VARIABLES
// ---------------------------
// these ones are "const" because they are fixed texts, they should not be
// changed by the program. i used ALL CAPS so it is obvious that they are fixed values.
const SYSTEM_NAME = "Grocery List";
const SYSTEM_SUBTITLE = "Things to buy this week";

// i put the colors in one object so if i want to change the theme,
// i only edit it here and not in every style below
const COLORS = {
  groceryGreen: "#2E7D32",
  accentOrange: "#F57C00",
  background: "#F1F8E9",
  card: "#FFFFFF",
  text: "#1F2A37",
  muted: "#6B7785",
  border: "#C5D6BE",
  bought: "#2E9E5B",
  danger: "#D32F2F",
};

export default function GroceryList() {
  // ---------------------------
  // STATE (useState)
  // ---------------------------
  // "items" holds the whole list, "text" holds what the user is currently typing.
  // both are state because the screen must update every time they change.
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [text, setText] = useState<string>("");

  // ---------------------------
  // ADD ITEM
  // ---------------------------
  // i used arrow syntax here because it is cleaner to read.
  const addItem = () => {
    // trim() removes the extra spaces, so an input with only spaces is not added.
    const name = text.trim();
    if (name === "") return;

    const newItem: GroceryItem = {
      // Date.now() is used as the id because it is different every time.
      id: Date.now().toString(),
      name,
      bought: false,
    };

    // the spread operator (...) copies the old items, so the new item goes
    // on top and i dont edit the old array directly.
    setItems([newItem, ...items]);
    // clear the TextInput after adding.
    setText("");
  };

  // ---------------------------
  // MARK AS BOUGHT
  // ---------------------------
  // map() loops through the list, only the tapped item gets its "bought" flipped,
  // the rest are returned as they are.
  const toggleBought = (id: string) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, bought: !item.bought } : item,
      ),
    );
  };

  // ---------------------------
  // DELETE ITEM
  // ---------------------------
  // filter() keeps every item except the one with the matching id.
  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // count of the bought items, used for the summary text below the input.
  const boughtCount = items.filter((item) => item.bought).length;

  // ---------------------------
  // ROW DESIGN (used by FlatList)
  // ---------------------------
  // i put the row in its own function so the FlatList below is easy to read.
  // the array in style={[ ]} lets me add the "bought" style only when it is true.
  const renderItem = ({ item }: { item: GroceryItem }) => (
    <TouchableOpacity
      style={[styles.item, item.bought && styles.itemBought]}
      onPress={() => toggleBought(item.id)}
      activeOpacity={0.7}
    >
      <View style={[styles.checkbox, item.bought && styles.checkboxBought]}>
        {item.bought && <Text style={styles.checkmark}>✓</Text>}
      </View>

      <Text style={[styles.itemText, item.bought && styles.itemTextBought]}>
        {item.name}
      </Text>

      {/* the delete button is inside the row, so each row has its own button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    // KeyboardAvoidingView pushes the screen up so the keyboard doesnt cover the input.
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <StatusBar barStyle="light-content" />

      {/* ---------------------------
          HEADER
          --------------------------- */}
      <View style={styles.header}>
        <Text style={styles.title}>{SYSTEM_NAME}</Text>
        <Text style={styles.subtitle}>{SYSTEM_SUBTITLE}</Text>
      </View>

      {/* ---------------------------
          INPUT AND ADD BUTTON
          --------------------------- */}
      {/* the TextInput is "controlled", its value comes from the "text" state,
          and onChangeText updates that state on every letter typed */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="e.g. Milk, Eggs, Rice"
          value={text}
          onChangeText={setText}
          onSubmitEditing={addItem}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* i used backticks (``) here instead of the + + + concatenation
          because it is much easier to read, and the ${} can hold the variable directly */}
      <Text style={styles.summary}>
        {`${boughtCount} of ${items.length} bought`}
      </Text>

      {/* ---------------------------
          GROCERY LIST (FlatList)
          --------------------------- */}
      {/* FlatList only renders the rows that are visible on the screen, that is why
          it is better than using map() inside a ScrollView for long lists.
          keyExtractor gives every row a unique key so React can track it. */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        // this shows only when the list is empty, it tells the user what to do.
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Your list is empty</Text>
            <Text style={styles.emptyText}>
              Type an item above and tap Add to start your grocery list.
            </Text>
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
}

// ---------------------------
// STYLES
// ---------------------------
// StyleSheet.create is placed at the bottom so the logic stays on top
// and the design stays separated, but still inside the same file.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // HEADER
  header: {
    backgroundColor: COLORS.groceryGreen,
    paddingTop: 48,
    paddingBottom: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderBottomColor: COLORS.accentOrange,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#DCEFD9",
  },

  // INPUT ROW (TextInput + Add button)
  inputRow: {
    flexDirection: "row",
    padding: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    height: 48,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  addButton: {
    height: 48,
    paddingHorizontal: 20,
    backgroundColor: COLORS.accentOrange,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  // SUMMARY TEXT
  summary: {
    paddingHorizontal: 20,
    paddingBottom: 8,
    fontSize: 14,
    color: COLORS.muted,
  },

  // LIST ROWS
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
  },
  itemBought: {
    backgroundColor: "#EEF6EC",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.groceryGreen,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxBought: {
    backgroundColor: COLORS.bought,
    borderColor: COLORS.bought,
  },
  checkmark: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.text,
  },
  itemTextBought: {
    textDecorationLine: "line-through",
    color: COLORS.muted,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: 14,
    fontWeight: "600",
  },

  // EMPTY STATE
  emptyContainer: {
    alignItems: "center",
    marginTop: 48,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },
  emptyText: {
    marginTop: 6,
    fontSize: 14,
    color: COLORS.muted,
    textAlign: "center",
  },
});
