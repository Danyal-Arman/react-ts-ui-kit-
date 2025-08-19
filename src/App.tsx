import { useState } from "react";
import InputField from "./components/InputField";
import DataTable from "./components/DataTable";

function App() {
  const [username, setUsername] = useState("");

  const users = [
    { id: 1, name: "Alice", role: "Developer" },
    { id: 2, name: "Bob", role: "Designer" },
    { id: 3, name: "Charlie", role: "Manager" },
  ];

 const columns: Column<typeof users[0]>[] = [
  { key: "id", title: "ID", dataIndex: "id", sortable: true },
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold">Reusable Components Demo</h1>

      <InputField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        helperText="This will be visible on your profile"
        errorMessage={username === "" ? "Username is required" : ""}
        invalid={username === ""}
        variant="outlined"
        size="md"
        clearable
        passwordToggle
      />

      <DataTable
        data={users}
        columns={columns}
        loading={false}
        selectable
        onRowSelect={(rows) => console.log("Selected rows:", rows)}
      />
    </div>
  );
}

export default App;
