package Back;



import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class Work {

    //construtor
    public Work( int ID, String Namework, double Pricehour, int Nvacancies){
        this.ID = ID;
        this.Namework = Namework;
        this.Pricehour = Pricehour;
        this.Nvacancies = Nvacancies;
    }

    private int ID;
    private String Namework;
    private double Pricehour;
    private int Nvacancies;

    public String toString(){
        String s = "";
        s += "ID: " + ID + "Name work" + Namework + "Price hour" + Pricehour + "N vacancies:" + Nvacancies;
        return s;
    }

    public int getID(){
        return ID; }

    public void setID (int ID){
        this.ID = ID; }

    public String getNamework(){
        return Namework; }

    public void setNamework (String Namework){
        this.Namework = Namework; }

    public double getPricehour(){
        return Pricehour; }

    public void setPricehour (double Pricehour){
        this.Pricehour = Pricehour; }

    public int getNvacancies(){
        return Nvacancies; }

    public void setNvacancies (int Nvacancies){
        this.Nvacancies = Nvacancies; }


     /*   JdbcTemplate template;

        public void setTemplate(JdbcTemplate template) {
            this.template = template;
        }
        public int save(Work p){
            String sql="insert into Work (Name_work,Price_hour,N_vacancies) values('"+p.getName_work()+"',"+p.getPrice_hour()+",'"+p.getN_vacancies()+"')";
            return template.update(sql);
        }
        public int update(Work p){
            String sql="update Work set Name_work ='"+p.getName_work()+"', Price_hour ="+p.getPrice_hour()+",N_vacancies='"+p.getN_vacancies()+"' where ID ="+p.getID()+"";
            return template.update(sql);
        }
        public int delete(int ID){
            String sql="delete from Emp99 where ID =" + ID + " ";
            return template.update(sql);
        }
        public Work getWorkById(int ID){
            String sql="select * from Work where ID = ?";
            return template.queryForObject(sql, new Object[]{ID},new BeanPropertyRowMapper<Work>(Work.class));
        }
        public List<Work> getWorks(){
            return template.query("select * from Work",new RowMapper<Work>(){
                public Work mapRow(ResultSet rs, int row) throws SQLException {
                    Work e=new Work();
                    e.setId(rs.getInt(1));
                    e.setName_work(rs.getString(2));
                    e.setPrice_hour(rs.getFloat(3));
                    e.setN_vacancies(rs.getString(4));
                    return e;
                }
            });
        }
*/




}
