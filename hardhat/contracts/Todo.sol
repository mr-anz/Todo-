// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Todo {
    uint256 public count=0;
    struct TodoItem {
        string task;
        bool completed;
        uint256 id;
    }

    mapping(address => TodoItem[]) public todoItems;

    event TodoItemAdded(
        address indexed userAddress, 
        string task
    );

    event TodoItemMarkedCompleted(
        address indexed userAddress,
        uint256 index
    );

    event TodoItemDeleted(
        address indexed userAddress,
        uint256 index
    );

    function addTodoItem(string memory _task) public {
        TodoItem memory newTodoItem = TodoItem({
            task: _task,
            completed: false,
            id: count
        });
        count++;
        todoItems[msg.sender].push(newTodoItem);
        emit TodoItemAdded(msg.sender, _task);
    }

    function markTodoItemCompleted(uint256 index) public {
        require(index < todoItems[msg.sender].length, "Invalid index");
        todoItems[msg.sender][index].completed = true;
        emit TodoItemMarkedCompleted(msg.sender, index);
    }

    function getTodoItems() public view returns (TodoItem[] memory) {
        return todoItems[msg.sender];
    }


}