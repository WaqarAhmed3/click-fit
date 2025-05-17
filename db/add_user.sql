DELIMITER //

CREATE PROCEDURE addUser (
  IN p_email VARCHAR(255),
  IN p_password VARCHAR(255),
  IN p_type ENUM('admin', 'user'),
  IN p_active BOOLEAN
)
BEGIN
  INSERT INTO users (email, password, type, active)
  VALUES (p_email, p_password, p_type, p_active);
END //

DELIMITER ;

-- Example call to stored procedure
CALL addUser('test@example.com', 'password123', 'admin', TRUE);
