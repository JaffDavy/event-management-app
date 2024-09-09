const createTicketTable = async () => {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS Tickets (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        event_id UUID NOT NULL REFERENCES Events(id),
        user_id UUID NOT NULL REFERENCES Users(id),
        purchase_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        ticket_type TEXT NOT NULL,
        price FLOAT NOT NULL
      )
    `);
  };
  