package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Cuonsach.
 */
@Entity
@Table(name = "cuonsach")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "cuonsach")
public class Cuonsach implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ngay_het_han")
    private Instant ngayHetHan;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @JsonIgnoreProperties(value = { "nhaxuatban" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Sach sach;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cuonsach id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getNgayHetHan() {
        return this.ngayHetHan;
    }

    public Cuonsach ngayHetHan(Instant ngayHetHan) {
        this.setNgayHetHan(ngayHetHan);
        return this;
    }

    public void setNgayHetHan(Instant ngayHetHan) {
        this.ngayHetHan = ngayHetHan;
    }

    public Integer getTrangThai() {
        return this.trangThai;
    }

    public Cuonsach trangThai(Integer trangThai) {
        this.setTrangThai(trangThai);
        return this;
    }

    public void setTrangThai(Integer trangThai) {
        this.trangThai = trangThai;
    }

    public Sach getSach() {
        return this.sach;
    }

    public void setSach(Sach sach) {
        this.sach = sach;
    }

    public Cuonsach sach(Sach sach) {
        this.setSach(sach);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cuonsach)) {
            return false;
        }
        return id != null && id.equals(((Cuonsach) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cuonsach{" +
            "id=" + getId() +
            ", ngayHetHan='" + getNgayHetHan() + "'" +
            ", trangThai=" + getTrangThai() +
            "}";
    }
}
