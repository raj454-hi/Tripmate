
import "./Dashboard.css";

function Dashboard() {
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
          <h2>0</h2>
          <small>Your planned adventures</small>
        </div>

        <div className="summary-card expenses-card">
          <span className="summary-icon">💳</span>
          <p>Total Expenses</p>
          <h2>{money(0)}</h2>
          <small>Money spent on trips</small>
        </div>

        <div className="summary-card owe-card">
          <span className="summary-icon">📤</span>
          <p>You Owe</p>
          <h2>{money(0)}</h2>
          <small>Pending payments</small>
        </div>

        <div className="summary-card owed-card">
          <span className="summary-icon">💰</span>
          <p>You Are Owed</p>
          <h2>{money(0)}</h2>
          <small>Money to receive</small>
        </div>
      </section>

      {/* My Trips */}
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
          <p>No trips added yet. Create your first trip!</p>
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

          <p>No expenses recorded yet.</p>

          <div className="panel-total">
            <span>Recent expense total</span>
            <strong>{money(0)}</strong>
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
              <h3 className="owe-text">{money(0)}</h3>
            </div>

            <div>
              <small>You Are Owed</small>
              <h3 className="owed-text">{money(0)}</h3>
            </div>
          </div>

          <p>No pending settlements.</p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
