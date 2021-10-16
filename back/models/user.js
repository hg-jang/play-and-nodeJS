module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {    // MySQL에는 users 테이블 생성
    // id가 기본적으로 들어 감.
    // 아래의 각 객체는 컬럼이라 부름. 실제 데이터들은 로우
    // 객체 안에는 칼럼의 조건
    email: {
      type: DataTypes.STRING(30),      // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME 등의 type 있음
      allowNull: false,           // 필수
      unique: true,               // 고유한 값
    },
    nickname: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  }, {
    charset: "utf8",
    collate: "utf8_general_ci",   // 한글 저장
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);     // user는 여러개의 post를 가질 수 있음
    db.User.hasMany(db.Comment);  // 여러개의 comment 작성 가능
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Likers' });  // 중간 table의 이름 지정 가능 user는 여러 개의 계시물을 좋아요 할 수 있고, post는 여러 개의 좋아요를 받을 수 있음. User의 이름은 likers로 지정
  };

  return User;
};