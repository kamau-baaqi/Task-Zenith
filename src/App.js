import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineCheckCircle } from "react-icons/ai";

function TaskZenith() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [newItemDescription, setNewItemDescription] = useState("");
  const [newItemDeadline, setNewItemDeadline] = useState("");
  const [expandedItemId, setExpandedItemId] = useState(null);

  const addItem = () => {
    if (newItem !== "") {
      const newItemEntry = {
        id: uuidv4(),
        title: newItem,
        description: newItemDescription,
        deadline: newItemDeadline,
        completed: false,
      };
      setItems([...items, newItemEntry]);
      setNewItem("");
      setNewItemDescription("");
      setNewItemDeadline("");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const toggleCompleted = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, completed: !item.completed };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const expandItem = (id) => {
    setExpandedItemId(id);
  };

  const collapseItem = () => {
    setExpandedItemId(null);
  };

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      fontFamily: "'Roboto', sans-serif",
      backgroundColor: "transparent", // Set background color to transparent
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: "150px", // Add left margin
      border: "none", // Remove the border
    },
    // content: {
    //   padding: "20px",
    //   paddingLeft: "250px", // Add left padding
    // },
    taskEntryContainer: {
      flex: "1",
      padding: "20px",
      marginRight: "20px",
      maxWidth: "400px",
    },
    taskListContainer: {
      flex: "1",
      padding: "20px",
      maxWidth: "calc(100% - 440px)", // Adjust the maxWidth value
    },
    title: {
      marginTop: "0",
      fontSize: "48px",
      fontWeight: "700",
      color: "#333",
    },
    input: {
      marginBottom: "10px",
      height: "45px",
      width: "300px",
      padding: "10px",
      fontSize: "18px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#FFFFFF",
      color: "#333",
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.05)",
    },
    textarea: {
      marginBottom: "10px",
      width: "300px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#FFFFFF",
      color: "#333",
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.05)",
    },
    deadline: {
      marginBottom: "10px",
      width: "300px",
      padding: "10px",
      fontSize: "16px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#FFFFFF",
      color: "#333",
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.05)",
    },
    button: {
      height: "40px", // Adjust the height as desired
      width: "100px", // Adjust the width as desired
      backgroundColor: "#333",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px", // Adjust the font size as desired
      fontWeight: "bold",
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.2)",
      cursor: "pointer",
    },
    listContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
      gridGap: "20px",
      marginTop: "20px",
    },
    listItem: (completed, textLength) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "10px",
      borderRadius: "5px",
      boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.05)",
      fontSize: "16px",
      color: "#333",
      backgroundColor: completed ? "#E0E0E0" : "#ccc",
      cursor: "pointer",
      transition: "background-color 0.3s",
      width: `${Math.max(120, textLength * 10)}px`, // Adjust the minimum width and the multiplication factor as needed
    }),
    listItemTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    listItemText: {
      display: "none",
      marginTop: "10px",
    },
    listItemDescription: {
      marginBottom: "10px",
      fontStyle: "italic",
    },
    listItemDeadline: {
      fontWeight: "bold",
    },
    listItemIcon: {
      marginRight: "10px",
      fontSize: "24px",
      color: "#333",
    },
    listItemDelete: {
      cursor: "pointer",
      marginLeft: "10px",
      color: "#999",
    },
    noTasks: {
      fontStyle: "italic",
      color: "#777",
    },
    credit: {
      position: "fixed",
      bottom: "10px",
      left: "50%", // Center along the X-axis
      transform: "translateX(-50%)", // Center along the X-axis
      color: "#333",
      fontSize: "12px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.taskEntryContainer}>
        <h1 style={styles.title}>Task Zenith</h1>
        <input
          style={styles.input}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter a task..."
        />
        <textarea
          style={styles.textarea}
          value={newItemDescription}
          onChange={(e) => setNewItemDescription(e.target.value)}
          placeholder="Enter task description..."
          rows={3}
        />
        <input
          style={styles.deadline}
          type="date"
          value={newItemDeadline}
          onChange={(e) => setNewItemDeadline(e.target.value)}
        />
        <button style={styles.button} onClick={addItem}>
          Add Task
        </button>
      </div>
      <div style={styles.taskListContainer}>
        <div style={styles.listContainer}>
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                style={styles.listItem(item.completed)}
                onClick={() => expandItem(item.id)}
              >
                <div style={styles.listItemTitle}>{item.title}</div>
              </div>
            ))
          ) : (
            <p style={styles.noTasks}>No tasks added yet.</p>
          )}
        </div>
      </div>
      {expandedItemId !== null &&
        items.find((item) => item.id === expandedItemId) && (
          <div style={styles.taskEntryContainer}>
            <h2>{items.find((item) => item.id === expandedItemId).title}</h2>
            <p>
              {items.find((item) => item.id === expandedItemId).description}
            </p>
            <p>
              <strong>Deadline:</strong>{" "}
              {items.find((item) => item.id === expandedItemId).deadline}
            </p>
            <div>
              <AiOutlineCheckCircle
                style={styles.listItemIcon}
                onClick={() => toggleCompleted(expandedItemId)}
              />
              <span
                style={styles.listItemDelete}
                onClick={() => deleteItem(expandedItemId)}
              >
                X
              </span>
            </div>
          </div>
        )}
      <div style={styles.credit}>Developed by KB Studio</div>
    </div>
  );
}

export default TaskZenith;
