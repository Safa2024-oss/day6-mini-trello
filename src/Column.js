import TaskCard from './TaskCard';

function Column({ column, tasks, onDrop, onDragOver, onDelete, onDragStart }) {
  return (
    <div
      className="column"
      onDragOver={onDragOver}
      onDrop={() => onDrop(column.id)}
    >
      <h2>{column.title}</h2>
      {tasks
        .filter((task) => task.status === column.id)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDelete}
            onDragStart={onDragStart}
          />
        ))}
    </div>
  );
}

export default Column;