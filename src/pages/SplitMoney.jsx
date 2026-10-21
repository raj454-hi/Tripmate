
import { useEffect, useState } from "react";
import "./SplitMoney.css";

const initialMembers = [
  { id: 1, name: "Amol", paid: 5000 },
  { id: 2, name: "Rahul", paid: 3000 },
  { id: 3, name: "Akash", paid: 2000 },
  { id: 4, name: "Sagar", paid: 2000 },
];

function SplitMoney() {
  const [members, setMembers] = useState(() => {
    try {
      const saved = localStorage.getItem("tripmateSplitMembers");
      return saved ? JSON.parse(saved) : initialMembers;
    } catch {
      return initialMembers;
    }
  });

  const [settlements, setSettlements] = useState([]);
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "tripmateSplitMembers",
      JSON.stringify(members)
    );
  }, [members]);

  const totalExpense = members.reduce(
    (total, member) => total + Number(member.paid || 0),
    0
  );

  const perPersonShare =
    members.length > 0 ? totalExpense / members.length : 0;

  const updateMember = (id, field, value) => {
    setMembers((currentMembers) =>
      currentMembers.map((member) =>
        member.id === id
          ? {
              ...member,
              [field]: field === "paid" ? value : value,
            }
          : member
      )
    );

    setCalculated(false);
    setSettlements([]);
    setError("");
  };

  const addMember = () => {
    setMembers((currentMembers) => [
      ...currentMembers,
      {
        id: Date.now(),
        name: "",
        paid: 0,
      },
    ]);

    setCalculated(false);
    setSettlements([]);
  };

  const removeMember = (id) => {
    setMembers((currentMembers) =>
      currentMembers.filter((member) => member.id !== id)
    );

    setCalculated(false);
    setSettlements([]);
    setError("");
  };

  const calculateSplit = () => {
    if (members.length < 2) {
      setError("Add at least 2 members to split the money.");
      return;
    }

    if (members.some((member) => !member.name.trim())) {
      setError("Please enter a name for every member.");
      return;
    }

    if (
      members.some(
        (member) =>
          member.paid === "" ||
          !Number.isFinite(Number(member.paid)) ||
          Number(member.paid) < 0
      )
    ) {
      setError("Enter a valid amount for every member.");
      return;
    }

    // Positive balance = member should receive money.
    // Negative balance = member should pay money.
    const balances = members.map((member) => ({
      name: member.name.trim(),
      balance: Number(member.paid) - perPersonShare,
    }));

    const creditors = balances
      .filter((member) => member.balance > 0.005)
      .map((member) => ({ ...member }));

    const debtors = balances
      .filter((member) => member.balance < -0.005)
      .map((member) => ({ ...member }));

    const newSettlements = [];
    let debtorIndex = 0;
    let creditorIndex = 0;

    while (
      debtorIndex < debtors.length &&
      creditorIndex < creditors.length
    ) {
      const amount = Math.min(
        -debtors[debtorIndex].balance,
        creditors[creditorIndex].balance
      );

      newSettlements.push({
        id: newSettlements.length + 1,
        from: debtors[debtorIndex].name,
        to: creditors[creditorIndex].name,
        amount: Math.round(amount * 100) / 100,
        paid: false,
      });

      debtors[debtorIndex].balance += amount;
      creditors[creditorIndex].balance -= amount;

      if (Math.abs(debtors[debtorIndex].balance) < 0.005) {
        debtorIndex++;
      }

      if (Math.abs(creditors[creditorIndex].balance) < 0.005) {
        creditorIndex++;
      }
    }

    setSettlements(newSettlements);
    setCalculated(true);
    setError("");
  };

  const markAsPaid = (id) => {
    setSettlements((current) =>
      current.map((item) =>
        item.id === id ? { ...item, paid: !item.paid } : item
      )
    );
  };

  const resetSplit = () => {
    setMembers([]);
    setSettlements([]);
    setCalculated(false);
    setError("");
  };

  const formatMoney = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="split-page">
      <div className="split-container">
        <header className="split-header">
          <p className="split-eyebrow">TRIPMATE • GROUP EXPENSES</p>
          <h1>Split Money</h1>
          <p>
            Add your travel buddies, enter how much each person paid,
            and calculate who owes whom.
          </p>
        </header>

        <section className="split-summary">
          <div className="summary-card">
            <span>Total Expense</span>
            <h2>{formatMoney(totalExpense)}</h2>
          </div>

          <div className="summary-card">
            <span>Total Members</span>
            <h2>{members.length}</h2>
          </div>

          <div className="summary-card">
            <span>Share Per Person</span>
            <h2>{formatMoney(perPersonShare)}</h2>
          </div>
        </section>

        <section className="split-panel">
          <div className="split-panel-heading">
            <div>
              <h2>Trip Members</h2>
              <p>Enter each member's name and total amount paid.</p>
            </div>

            <button
              type="button"
              className="split-secondary-btn"
              onClick={addMember}
            >
              + Add Member
            </button>
          </div>

          <div className="member-list">
            {members.map((member, index) => (
              <div className="member-row" key={member.id}>
                <span className="member-number">{index + 1}</span>

                <label className="split-field">
                  <span>Member Name</span>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={member.name}
                    onChange={(event) =>
                      updateMember(member.id, "name", event.target.value)
                    }
                  />
                </label>

                <label className="split-field">
                  <span>Amount Paid (₹)</span>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0"
                    value={member.paid}
                    onChange={(event) =>
                      updateMember(member.id, "paid", event.target.value)
                    }
                  />
                </label>

                <button
                  type="button"
                  className="remove-member-btn"
                  onClick={() => removeMember(member.id)}
                  aria-label={`Remove ${member.name || "member"}`}
                  title="Remove member"
                >
                  ✕
                </button>
              </div>
            ))}

            {members.length === 0 && (
              <p className="split-empty">
                No members added yet. Click “Add Member” to start.
              </p>
            )}
          </div>

          {error && <p className="split-error">{error}</p>}

          <div className="split-actions">
            <button
              type="button"
              className="split-primary-btn"
              onClick={calculateSplit}
            >
              Calculate Split
            </button>

            <button
              type="button"
              className="split-reset-btn"
              onClick={resetSplit}
            >
              Clear All
            </button>
          </div>
        </section>

        {calculated && (
          <section className="split-panel settlement-panel">
            <div className="split-panel-heading">
              <div>
                <h2>Settlement Summary</h2>
                <p>Who should pay whom to make the split equal.</p>
              </div>
            </div>

            <div className="share-info">
              Each member's share is{" "}
              <strong>{formatMoney(perPersonShare)}</strong>.
            </div>

            {settlements.length === 0 ? (
              <p className="split-success">
                Everyone is settled! No payments are needed.
              </p>
            ) : (
              <div className="settlement-list">
                {settlements.map((item) => (
                  <div className="settlement-row" key={item.id}>
                    <div className="settlement-details">
                      <strong>{item.from}</strong>
                      <span> pays </span>
                      <strong>{item.to}</strong>
                      <h3>{formatMoney(item.amount)}</h3>
                    </div>

                    <button
                      type="button"
                      className={
                        item.paid
                          ? "paid-btn is-paid"
                          : "paid-btn"
                      }
                      onClick={() => markAsPaid(item.id)}
                    >
                      {item.paid ? "✓ Paid" : "Mark as Paid"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="split-note">
              Note: Marking a payment as paid is currently temporary.
              Payment status will reset if you recalculate or refresh.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

export default SplitMoney;
