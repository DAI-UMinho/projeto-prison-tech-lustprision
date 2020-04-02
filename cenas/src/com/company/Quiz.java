package com.company;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import com.javatpoint.beans.Emp;

import javax.xml.crypto.dsig.dom.DOMValidateContext;

public class Quiz {
    public Quiz( int IdQuiz, int idQuestion, int qtyQuestions){
        this.IdQuiz = IdQuiz;
        this.idQuestion = idQuestion;
        this.qtyQuestions = qtyQuestions;
    }
    private int IdQuiz;
    private int idQuestion;
    private int qtyQuestions;

    public String toString(){
        String s = "";
        s += "ID: " + IdQuiz + "idQuestion" + idQuestion + "qtyQuestions" + qtyQuestions;
        return s;
    }

    public int getIdQuiz(){
        return IdQuiz; }

    public void setIdQuiz (int IdQuiz){
        this.IdQuiz = IdQuiz; }

    public int getIdQuestion(){
        return idQuestion; }

    public void setIdQuestion (int idQuestion){
        this.idQuestion = idQuestion; }

    public int getQtyQuestions(){
        return qtyQuestions; }

    public void setQtyQuestions (int qtyQuestions){
        this.qtyQuestions = qtyQuestions; }

    JdbcTemplate template;

    public void setTemplate(JdbcTemplate template) {
        this.template = template;
    }
    public int save(Quiz p){
        String sql="insert into Quiz (idQuestion, qtyQuestions) values('" + p.getIdQuestion() + "',"+p.getQtyQuestions()+"')";
        return template.update(sql);
    }
    public int update(Quiz p){
        String sql="update Quiz set idQuestion ='"+p.getIdQuestion()+"', qtyQuestions ="+p.getQtyQuestions()+"' where IdQuiz ="+p.getIdQuiz()+"";
        return template.update(sql);
    }
    public int delete(int IdQuiz){
        String sql="delete from Quiz where IdQuiz =" + IdQuiz + " ";
        return template.update(sql);
    }
    public Work getQuizbyID(int IdQuiz){
        String sql="select * from Quiz where IdQuiz = ?";
        return template.queryForObject(sql, new Object[]{IdQuiz},new BeanPropertyRowMapper<Quiz>(Quiz.class));
    }
    public List<Quiz> getQuiz(){
        return template.query("select * from Quiz",new RowMapper<Quiz>(){
            public Quiz mapRow(ResultSet rs, int row) throws SQLException {
                Quiz e = new Quiz();
                e.setIdQuiz(rs.getInt(1));
                e.setIdQuestion(rs.getInt(2));
                e.setQtyQuestions(rs.getInt(3));
                return e;
            }
        });
    }
}
