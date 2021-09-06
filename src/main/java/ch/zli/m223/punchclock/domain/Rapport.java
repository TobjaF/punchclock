package ch.zli.m223.punchclock.domain;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;


import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Rapport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double workload;

    @ManyToOne
    @JoinColumn(name = "USER_ID")
    private ApplicationUser user;

    @ManyToOne
    @JoinColumn(name = "PROJECT_ID")
    private Project project;

    public Double getWorkload() {
        return workload;
    }

    public void setWorkload(Double workload) {
        this.workload = workload;
    }

    public void setUser (ApplicationUser user) { this.user = user;}

    public ApplicationUser getUser(){ return user;}

    public void setProject (Project project) { this.project = project;}

    public Project getProject(){ return project;}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }


}
