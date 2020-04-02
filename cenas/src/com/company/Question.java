package com.company;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import com.javatpoint.beans.Emp;
import javax.xml.crypto.dsig.dom.DOMValidateContext;

public class Question {
    public Question( int idQuestion, String question, double value, String answer){
        this.idQuestion = idQuestion;
        this.question = question;
        this.value = value;
        this.answer = answer;
    }
    private int idQuestion;
    private String question;
    private double value;
    private String answer;

    public String toString(){
        String s = "";
        s += "IdQuestion: " + idQuestion + "Question" + question + "value" + value + "answer" + answer;
        return s;
    }

    public int getIdQuestion(){
        return idQuestion; }

    public void setIdQuestion (int idQuestion){
        this.idQuestion = idQuestion; }

    public String getQuestion(){
        return question; }

    public void setQuestion (String question){
        this.question = question; }

    public double getValue(){
        return value; }

    public void setValue (double value){
        this.value = value; }

    public String getAnswer(){
        return answer; }

    public void setAnswer (String answer){
        this.answer = answer; }

    JdbcTemplate template;

    public void setTemplate(JdbcTemplate template) {
        this.template = template;
    }
    public int save(Question p){
        String sql="insert into Question (question, value, answer) values('" + p.getQuestion() + "',"+p.getValue()+","+p.getAnswer()+"')";
        return template.update(sql);
    }
    public int update(Question p){
        String sql="update Question set question ='"+p.getQuestion()+"', value ="+p.getValue()+"', answer ="+p.getAnswer()+"' where IdQuestion ="+p.getIdQuestion()+"";
        return template.update(sql);
    }
    public int delete(int idQuestion){
        String sql="delete from Question where idquestion =" + idQuestion + " ";
        return template.update(sql);
    }
    public Work getQuestionbyID(int idQuestion){
        String sql="select * from Question where idquestion = ?";
        return template.queryForObject(sql, new Object[]{idQuestion},new BeanPropertyRowMapper<Question>(Question.class));
    }
    public Question<Question> getQuestions(){
        return template.query("select * from Question",new RowMapper<Question>(){
            public Question mapRow(ResultSet rs, int row) throws SQLException {
                Question e = new Question();
                e.setIdQuestion(rs.getInt(1));
                e.setQuestion(rs.getString(2));
                e.setValue(rs.getDouble(3));
                e.setAnswer(rs.getString(4));
                return e;
            }
        });
    }
}
