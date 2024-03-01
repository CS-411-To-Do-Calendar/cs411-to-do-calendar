# To-Do List Project

## Introduction

This application is designed to consolidate your to-do list and schedule into a single, easy-to-use platform. It aims to help users manage their work deadlines and track their progress efficiently.

## Problem Statement

In our fast-paced world, keeping track of tasks and deadlines can be overwhelming. This application addresses this issue by providing a centralized platform for managing tasks and schedules.

## Features

- **Integration with Google Calendar**: This application is designed to sync with Google Calendar, allowing users to have their tasks and deadlines in one place.
- **Automatic Meeting Addition**: The application can automatically add Google Meet or Zoom meetings to your calendar, ensuring you never miss a meeting.
- **Task-Deadline Connection**: The application links your to-do list with its respective deadlines in the calendar, providing a visual representation of your tasks and when they are due.

## Target Audience

This application is for anyone looking to increase their work efficiency. It is particularly useful for individuals of all ages, college students, and office workers who juggle multiple tasks and deadlines.

## Usage

The application can be used for daily work and task management. It provides a seamless connection between your to-do list and its respective deadlines in the calendar.

## Unique Value

The unique value of this application lies in its ability to integrate task management with schedule tracking in a single platform. This integration allows users to have a comprehensive overview of their tasks and deadlines, thereby enhancing their productivity and work efficiency.


## Run Locally

Clone the project

```bash
  git clone https://github.com/CS-411-To-Do-Calendar/cs411-to-do-calendar.git
```

Go to the project directory

```bash
  cd cs411-to-do-calendar
```

Install dependencies

```bash
  npm install
```

Start the server !defaulted to local:3000

```bash
  npm start
```


## API Reference (Not complete yet)

#### Get all items

```http
  GET /api/items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /api/items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### add(num1, num2)

Takes two numbers and returns the sum.


## Authors

- [@octokatherine](https://www.github.com/octokatherine)

