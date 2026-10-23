
import { useState } from "react";
import "./SplitMoney.css";

function SplitMoney() {
  const [members, setMembers] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [calculated, setCalculated] = useState(false);
  const [error, setError] = useState("");

  const total = members.reduce(
    (sum, member) => sum + Number(member.paid || 0), 0
  );

  const share = members.length ? total / members.length : 0;

  function addMember() {
    setMembers([...members, { id: Date.now(), name: "", paid: "" }]);
    setCalculated(false);
    setSettlements([]);
  }

  function updateMember(id, field, value) {
    setMembers(members.map((m) =>
      m.id === id ? { ...m, [field]: value } : m
    ));
    setCalculated(false);
    setSettlements([]);
  }

  function removeMember(id) {
    setMembers(members.filter((m) => m.id !== id));
    setCalculated(false);
    setSettlements([]);
  }

  function calculateSplit() {
    if (members.length < 2 || members.some((m) => !m.name.trim())) {
      setError("Add at least 2 members and enter their names.");
      return;
    }

    if (members.some((m) => m.paid === "" || !Number.isFinite(Number(m.paid)) || Number(m.paid) < 0)) {
      setError("Enter valid amounts for all members.");
      return;
    }

    const people = members.map((m) => ({
      name: m.name.trim(),
      balance: Number(m.paid) - share,
    }));

    const debtors = people.filter((m) => m.balance < -0.005);
    const creditors = people.filter((m) => m.balance > 0.005);
    const result = [];
    let i = 0, j = 0;

    while (i < debtors.length && j < creditors.length) {
      const amount = Math.min(-debtors[i].balance, creditors[j].balance);

      result.push({
        id: result.length + 1,
        from: debtors[i].name,
        to: creditors[j].name,
        amount: Math.round(amount * 100) / 100,
        paid: false,
      });

      debtors[i].balance += amount;
      creditors[j].balance -= amount;

      if (Math.abs(debtors[i].balance) < 0.005) i++;
      if (Math.abs(creditors[j].balance) < 0.005) j++;
    }

    setSettlements(result);
    setCalculated(true);
    setError("");
  }

  function money(amount) {
    return "₹" + Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });
  }

  return (
    <div className="split-page">
      <div className="split-container">
        <header className="split-header">
          <p className="split-eyebrow">TRIPMATE • GROUP EXPENSES</p>
          <h1>Split Money</h1>
          <p>Add members and calculate who pays whom.</p>
        </header>

        <section className="split-summary">
          <div className="summary-card">
            <span>Total Expense</span><h2>{money(total)}</h2>
          </div>
          <div className="summary-card">
            <span>Total Members</span><h2>{members.length}</h2>
          </div>
          <div className="summary-card">
            <span>Share Per Person</span><h2>{money(share)}</h2>
          </div>
        </section>

        <section className="split-panel">
          <div className="split-panel-heading">
            <div>
              <h2>Trip Members</h2>
              <p>Enter each member's name and amount paid.</p>
            </div>
            <button className="split-secondary-btn" onClick={addMember}>
              + Add Member
            </button>
          </div>

          <div className="member-list">
            {members.map((m, index) => (
              <div className="member-row" key={m.id}>
                <span className="member-number">{index + 1}</span>

                <label className="split-field">
                  <span>Member Name</span>
                  <input
                    placeholder="Enter name"
                    value={m.name}
                    onChange={(e) => updateMember(m.id, "name", e.target.value)}
                  />
                </label>

                <label className="split-field">
                  <span>Amount Paid (₹)</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter amount"
                    value={m.paid}
                    onChange={(e) => updateMember(m.id, "paid", e.target.value)}
                  />
                </label>

                <button className="remove-member-btn" onClick={() => removeMember(m.id)}>
                  ✕
                </button>
              </div>
            ))}

            {!members.length && (
              <p className="split-empty">No members yet. Click Add Member.</p>
            )}
          </div>

          {error && <p className="split-error">{error}</p>}

          <div className="split-actions">
            <button className="split-primary-btn" onClick={calculateSplit}>
              Calculate Split
            </button>
            <button className="split-reset-btn" onClick={() => {
              setMembers([]);
              setSettlements([]);
              setCalculated(false);
              setError("");
            }}>
              Clear All
            </button>
          </div>
        </section>

        {calculated && (
          <section className="split-panel settlement-panel">
            <h2>Settlement Summary</h2>
            <p className="share-info">Each person's share: <strong>{money(share)}</strong></p>

            {!settlements.length ? (
              <p className="split-success">Everyone is settled!</p>
            ) : settlements.map((s) => (
              <div className="settlement-row" key={s.id}>
                <div className="settlement-details">
                  <strong>{s.from}</strong> pays <strong>{s.to}</strong>
                  <h3>{money(s.amount)}</h3>
                </div>
                <button
                  className={s.paid ? "paid-btn is-paid" : "paid-btn"}
                  onClick={() => setSettlements(settlements.map((item) =>
                    item.id === s.id ? { ...item, paid: !item.paid } : item
                  ))}
                >
                  {s.paid ? "✓ Paid" : "Mark as Paid"}
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}

export default SplitMoney;
