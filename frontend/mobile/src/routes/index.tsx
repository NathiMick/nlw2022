import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.router";

export function Routes() {
    return (
        <NavigationContainer>
            <AppRoutes />
        </NavigationContainer>
    )
}