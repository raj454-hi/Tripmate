
import "./Dashboard.css";

const trips = [
  {
    id: 1,
    destination: "Goa",
    dates: "20 Dec - 23 Dec",
    members: 5,
    budget: 20000,
    spent: 12500,
  },
  {
    id: 2,
    destination: "Mahabaleshwar",
    dates: "10 Jan - 12 Jan",
    members: 4,
    budget: 12000,
    spent: 4500,
  },
];

const expenses = [
  { id: 1, title: "Hotel Booking", category: "Stay", amount: 5000 },
  { id: 2, title: "Food & Drinks", category: "Food", amount: 2500 },
  { id: 3, title: "Travel Tickets", category: "Travel", amount: 3000 },
];

const settlements = [
  { id: 1, name: "Rahul", amount: 800, type: "owes" },
  { id: 2, name: "Amit", amount: 1500, type: "owed" },
];

function Dashboard() {
  const totalBudget = trips.reduce(
    (sum, trip) => sum + trip.budget,
    0
  );

  const totalExpenses = trips.reduce(
    (sum, trip) => sum + trip.spent,
    0
  );

  const youOwe = settlements
    .filter((item) => item.type === "owes")
    .reduce((sum, item) => sum + item.amount, 0);

  const youAreOwed = settlements
    .filter((item) => item.type === "owed")
    .reduce((sum, item) => sum + item.amount, 0);

  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-subtitle">WELCOME TO TRIPMATE</p>
          <h1>Dashboard</h1>
          <p>Plan your trips, track expenses and split money easily.</p>
        </div>

        <button
          className="create-trip-btn"
          onClick={() => (window.location.href = "/create-trip")}
        >
          + Create Trip
        </button>
      </header>

      {/* Summary Cards */}
      <section className="summary-grid">
        <div className="summary-card trips-card">
          <span className="summary-icon">✈️</span>
          <p>Total Trips</p>
          <h2>{trips.length}</h2>
          <small>Your planned adventures</small>
        </div>

        <div className="summary-card expenses-card">
          <span className="summary-icon">💳</span>
          <p>Total Expenses</p>
          <h2>{money(totalExpenses)}</h2>
          <small>Money spent on trips</small>
        </div>

        <div className="summary-card owe-card">
          <span className="summary-icon">📤</span>
          <p>You Owe</p>
          <h2>{money(youOwe)}</h2>
          <small>Pending payments</small>
        </div>

        <div className="summary-card owed-card">
          <span className="summary-icon">💰</span>
          <p>You Are Owed</p>
          <h2>{money(youAreOwed)}</h2>
          <small>Money to receive</small>
        </div>
      </section>

      {/* Trips Section */}
      <section className="dashboard-section">
        <div className="section-heading">
          <div>
            <h2>My Trips</h2>
            <p>Overview of your travel plans</p>
          </div>

          <button
            className="text-btn"
            onClick={() => (window.location.href = "/my-trips")}
          >
            View All →
          </button>
        </div>

        <div className="trip-grid">
          {trips.map((trip) => {
            const percentage = Math.min(
              (trip.spent / trip.budget) * 100,
              100
            );

            return (
              <article className="trip-card" key={trip.id}>
                <div className="trip-card-top">
                  <span className="trip-emoji">📍</span>
                  <span className="trip-status">Planned Trip</span>
                </div>

                <h3>{trip.destination}</h3>
                <p>📅 {trip.dates}</p>
                <p>👥 {trip.members} Members</p>

                <div className="budget-info">
                  <span>Budget Used</span>
                  <strong>{Math.round(percentage)}%</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="budget-values">
                  <span>Spent: {money(trip.spent)}</span>
                  <span>Budget: {money(trip.budget)}</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Expenses and Split Money */}
      <section className="details-grid">
        <div className="dashboard-panel">
          <div className="section-heading">
            <div>
              <h2>Recent Expenses</h2>
              <p>Where your money goes</p>
            </div>
            <button
              className="text-btn"
              onClick={() => (window.location.href = "/expenses")}
            >
              View All →
            </button>
          </div>

          <div className="expense-list">
            {expenses.map((expense) => (
              <div className="expense-item" key={expense.id}>
                <div className="expense-icon">🧾</div>
                <div className="expense-description">
                  <strong>{expense.title}</strong>
                  <small>{expense.category}</small>
                </div>
                <strong>{money(expense.amount)}</strong>
              </div>
            ))}
          </div>

          <div className="panel-total">
            <span>Recent expense total</span>
            <strong>
              {money(
                expenses.reduce((sum, item) => sum + item.amount, 0)
              )}
            </strong>
          </div>
        </div>

        <div className="dashboard-panel">
          <div className="section-heading">
            <div>
              <h2>Split Money</h2>
              <p>Settle up with your friends</p>
            </div>
            <button
              className="text-btn"
              onClick={() => (window.location.href = "/split-money")}
            >
              Open →
            </button>
          </div>

          <div className="settlement-summary">
            <div>
              <small>You Owe</small>
              <h3 className="owe-text">{money(youOwe)}</h3>
            </div>
            <div>
              <small>You Are Owed</small>
              <h3 className="owed-text">{money(youAreOwed)}</h3>
            </div>
          </div>

          <div className="settlement-list">
            {settlements.map((item) => (
              <div className="settlement-item" key={item.id}>
                <div className="member-avatar">
                  {item.name.charAt(0)}
                </div>

                <div className="expense-description">
                  <strong>{item.name}</strong>
                  <small>
                    {item.type === "owes"
                      ? "You need to pay"
                      : "They need to pay you"}
                  </small>
                </div>

                <strong
                  className={
                    item.type === "owes" ? "owe-text" : "owed-text"
                  }
                >
                  {money(item.amount)}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
