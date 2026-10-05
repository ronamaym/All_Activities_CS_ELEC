/* Activity: React Navigation - Recipe Book (single file version)
===> by: Rona May M. Payos - BSCS3B
===> this program is a simple Recipe Book app that moves between 3 screens:
===> Home (categories) -> Recipe List (filtered by category) -> Recipe Details.
===> it uses: NavigationContainer, createNativeStackNavigator, navigation.navigate(),
===> navigation.goBack(), and route.params to pass data between screens.

===> i put everything (data, styles, 3 screens, navigator) in ONE file so it is
     easy to compile and submit. no backend, the data is a hardcoded array.
*/

// ---------------------------
// Note!!!!!!!!!!!!!!!!!!!!!!!
// put this file in src/app/ and rename it to => index.tsx (or copy its content into index.tsx)
// my project uses Expo Router, which ALREADY has its own NavigationContainer,
// so i wrapped mine in <NavigationIndependentTree> to avoid the "nested container" crash.
// also set headerShown: false in src/app/_layout.tsx so there is no double header:
//     <Stack screenOptions={{ headerShown: false }} />
// ---------------------------

// ---------------------------
// IMPORTS (USING DESTRUCTURING)
// ---------------------------
import { NavigationContainer, NavigationIndependentTree } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// ---------------------------
// TYPES
// ---------------------------
// Recipe type so TypeScript warns me if a field is missing when passing the object around.
type Recipe = {
  id: string;
  category: string;
  name: string;
  time: string;
  description: string;
  ingredients: string[];
};

// tells React Navigation what params each screen expects:
// Home needs nothing, RecipeList needs a category, RecipeDetails needs a whole recipe.
type RootStackParamList = {
  Home: undefined;
  RecipeList: { category: string };
  RecipeDetails: { recipe: Recipe };
};

// ---------------------------
// CONST VARIABLES (MOCK DATA)
// ---------------------------
// "const" + ALL CAPS because these are fixed values that should not be changed by the program.
const PRIMARY_COLOR = "#E8590C";
const CATEGORIES: string[] = ["Breakfast", "Lunch", "Dinner", "Dessert"];

const RECIPES: Recipe[] = [
  {
    id: "1",
    category: "Breakfast",
    name: "Fluffy Pancakes",
    time: "20 min",
    description: "Soft, golden pancakes perfect with syrup and fresh fruit.",
    ingredients: ["1 1/2 cups flour", "1 cup milk", "1 egg", "2 tbsp sugar", "1 tbsp baking powder"],
  },
  {
    id: "2",
    category: "Breakfast",
    name: "Veggie Omelette",
    time: "10 min",
    description: "A protein-packed omelette filled with peppers, onions and cheese.",
    ingredients: ["3 eggs", "1/4 cup bell pepper", "1/4 cup onion", "1/4 cup cheese", "Salt & pepper"],
  },
  {
    id: "3",
    category: "Lunch",
    name: "Chicken Caesar Wrap",
    time: "15 min",
    description: "Grilled chicken, crisp romaine and Caesar dressing in a tortilla.",
    ingredients: ["1 grilled chicken breast", "Romaine lettuce", "Caesar dressing", "Parmesan", "1 large tortilla"],
  },
  {
    id: "4",
    category: "Lunch",
    name: "Tomato Basil Soup",
    time: "30 min",
    description: "Creamy tomato soup with fresh basil. Great with grilled cheese.",
    ingredients: ["6 ripe tomatoes", "1 onion", "2 cloves garlic", "Fresh basil", "1/2 cup cream"],
  },
  {
    id: "5",
    category: "Dinner",
    name: "Spaghetti Carbonara",
    time: "25 min",
    description: "Classic Roman pasta with eggs, cheese, pancetta and black pepper.",
    ingredients: ["200g spaghetti", "100g pancetta", "2 eggs", "1/2 cup pecorino", "Black pepper"],
  },
  {
    id: "6",
    category: "Dinner",
    name: "Chicken Adobo",
    time: "45 min",
    description: "Filipino braised chicken in soy sauce, vinegar and garlic.",
    ingredients: ["1 kg chicken", "1/2 cup soy sauce", "1/2 cup vinegar", "6 cloves garlic", "2 bay leaves"],
  },
  {
    id: "7",
    category: "Dessert",
    name: "Chocolate Lava Cake",
    time: "25 min",
    description: "Warm chocolate cake with a molten center.",
    ingredients: ["100g dark chocolate", "1/2 cup butter", "2 eggs", "1/4 cup sugar", "2 tbsp flour"],
  },
  {
    id: "8",
    category: "Dessert",
    name: "Mango Float",
    time: "20 min + chill",
    description: "Layers of graham crackers, cream and sweet ripe mangoes.",
    ingredients: ["3 ripe mangoes", "Graham crackers", "2 cups whipped cream", "1 can condensed milk"],
  },
];

// ---------------------------
// SCREEN 1: HOME
// ---------------------------
// shows the categories. tapping one uses navigate() to go FORWARD and passes the category.
function HomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "Home">) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Chef! 🍳</Text>
      <Text style={styles.subtitle}>Pick a category to browse recipes.</Text>

      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          // the second argument of navigate() becomes route.params on the next screen
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("RecipeList", { category: item })}
          >
            <Text style={styles.cardTitle}>{item}</Text>
            {/* backticks instead of + + + concatenation, easier to read */}
            <Text style={styles.cardSub}>{`Tap to view ${item.toLowerCase()} recipes`}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// ---------------------------
// SCREEN 2: RECIPE LIST
// ---------------------------
// receives the category from Home, filters the mock data,
// and passes the WHOLE recipe object to the Details screen.
function RecipeListScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, "RecipeList">) {
  // route.params = data sent by Home, destructured to keep it clean
  const { category } = route.params;
  const filteredRecipes = RECIPES.filter((recipe) => recipe.category === category);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${category} Recipes`}</Text>
      <Text style={styles.subtitle}>{`${filteredRecipes.length} recipes found`}</Text>

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // sending the entire object is easier than sending each field one by one
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("RecipeDetails", { recipe: item })}
          >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardSub}>{`⏱ ${item.time}`}</Text>
          </TouchableOpacity>
        )}
      />

      {/* CUSTOM BACK BUTTON #1: goBack() pops this screen and returns to Home */}
      <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => navigation.goBack()}>
        <Text style={[styles.buttonText, styles.buttonOutlineText]}>← Back to Categories</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------------------------
// SCREEN 3: RECIPE DETAILS
// ---------------------------
// receives the recipe object through route.params and displays it.
function RecipeDetailsScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, "RecipeDetails">) {
  const { recipe } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{recipe.name}</Text>
      <Text style={styles.subtitle}>{`${recipe.category} • ⏱ ${recipe.time}`}</Text>

      <Text style={styles.sectionLabel}>Description</Text>
      <Text style={styles.bodyText}>{recipe.description}</Text>

      <Text style={styles.sectionLabel}>Ingredients</Text>
      {/* map() loops through the ingredients array and makes one Text per item */}
      {recipe.ingredients.map((ingredient, index) => (
        <Text key={index} style={styles.cardSub}>{`• ${ingredient}`}</Text>
      ))}

      {/* CUSTOM BACK BUTTON #2: manual reverse navigation using goBack() */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>← Go Back</Text>
      </TouchableOpacity>

      {/* navigate("Home") jumps back to the first screen in one tap */}
      <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => navigation.navigate("Home")}>
        <Text style={[styles.buttonText, styles.buttonOutlineText]}>Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ---------------------------
// NAVIGATOR (MAIN APP)
// ---------------------------
// passing RootStackParamList makes every screen name and param type-checked.
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: { backgroundColor: PRIMARY_COLOR },
            headerTintColor: "#FFFFFF",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Recipe Book" }} />

          {/* header title is read from route.params, so it shows the chosen category */}
          <Stack.Screen
            name="RecipeList"
            component={RecipeListScreen}
            options={({ route }) => ({ title: route.params.category })}
          />

          <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} options={{ title: "Recipe Details" }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

// ---------------------------
// STYLES
// ---------------------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF8F0", padding: 16 },
  title: { fontSize: 26, fontWeight: "bold", color: "#212529", marginBottom: 6 },
  subtitle: { fontSize: 16, color: "#6C757D", marginBottom: 16 },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#212529" },
  cardSub: { fontSize: 14, color: "#6C757D", marginTop: 4 },

  sectionLabel: { fontSize: 18, fontWeight: "600", color: "#212529", marginTop: 8 },
  bodyText: { fontSize: 15, color: "#6C757D", marginTop: 4, marginBottom: 12 },

  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  buttonOutline: { backgroundColor: "transparent", borderWidth: 2, borderColor: PRIMARY_COLOR },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
  buttonOutlineText: { color: PRIMARY_COLOR },
});

// End of program. Thank you for testing and Reading the documentation of this code!
