package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Thuephong.
 */
@Entity
@Table(name = "thuephong")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "thuephong")
public class Thuephong implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ngay_thue")
    private Instant ngayThue;

    @Column(name = "ca")
    private Integer ca;

    @ManyToOne
    private Docgia docgia;

    @ManyToOne
    private Phongdocsach phongdocsach;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Thuephong id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getNgayThue() {
        return this.ngayThue;
    }

    public Thuephong ngayThue(Instant ngayThue) {
        this.setNgayThue(ngayThue);
        return this;
    }

    public void setNgayThue(Instant ngayThue) {
        this.ngayThue = ngayThue;
    }

    public Integer getCa() {
        return this.ca;
    }

    public Thuephong ca(Integer ca) {
        this.setCa(ca);
        return this;
    }

    public void setCa(Integer ca) {
        this.ca = ca;
    }

    public Docgia getDocgia() {
        return this.docgia;
    }

    public void setDocgia(Docgia docgia) {
        this.docgia = docgia;
    }

    public Thuephong docgia(Docgia docgia) {
        this.setDocgia(docgia);
        return this;
    }

    public Phongdocsach getPhongdocsach() {
        return this.phongdocsach;
    }

    public void setPhongdocsach(Phongdocsach phongdocsach) {
        this.phongdocsach = phongdocsach;
    }

    public Thuephong phongdocsach(Phongdocsach phongdocsach) {
        this.setPhongdocsach(phongdocsach);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Thuephong)) {
            return false;
        }
        return id != null && id.equals(((Thuephong) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Thuephong{" +
            "id=" + getId() +
            ", ngayThue='" + getNgayThue() + "'" +
            ", ca=" + getCa() +
            "}";
    }
}
