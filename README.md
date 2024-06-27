# To-Do List Application

This is a fully-featured To-Do List application built with Angular, providing an intuitive and interactive user experience for managing tasks. The app leverages Angular's powerful features such as directives, services, and reactive programming with RxJS to deliver a dynamic and responsive application.

## Features

- **Add Tasks**: Quickly add new tasks to your to-do list.
- **Mark as Done**: Toggle tasks between done and not done with a single click.
- **Remove Tasks**: Delete tasks from the list easily.
- **Drag and Drop**: Reorder tasks using drag and drop functionality.
- **Animations**: Smooth animations for adding, removing, and reordering tasks.
- **Reactive Programming**: Uses RxJS for reactive state management and asynchronous handling.
- **Optimized for Performance**: Uses `ChangeDetectionStrategy.OnPush` for optimized change detection.

## Technologies Used

- **Angular**: The primary framework used for building the application.
- **RxJS**: For handling reactive programming and managing asynchronous data streams.
- **SCSS**: For styling the application.
- **TypeScript**: For writing robust and type-safe code.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/todo-list-angular.git
    cd todo-list-angular
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    ng serve
    ```

4. Navigate to `http://localhost:4200/` in your web browser to see the application in action.

## Project Structure

- `app.component.ts`: The main component handling the core logic of the To-Do list.
- `animate.directive.ts`: A custom directive for handling animations.
- `todo-service.service.ts`: A service for managing the state and logic related to the to-do tasks.
- `todo.types.ts`: Defines the types used in the application, such as the `Todo` interface.
