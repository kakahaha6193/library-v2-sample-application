package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Muonsach.
 */
@Entity
@Table(name = "muonsach")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "muonsach")
public class Muonsach implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ngay_muon")
    private Instant ngayMuon;

    @Column(name = "han_tra")
    private Instant hanTra;

    @Column(name = "ngay_tra")
    private Instant ngayTra;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @ManyToOne
    private Docgia docgia;

    @ManyToOne
    @JsonIgnoreProperties(value = { "sach" }, allowSetters = true)
    private Cuonsach cuonsach;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Muonsach id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getNgayMuon() {
        return this.ngayMuon;
    }

    public Muonsach ngayMuon(Instant ngayMuon) {
        this.setNgayMuon(ngayMuon);
        return this;
    }

    public void setNgayMuon(Instant ngayMuon) {
        this.ngayMuon = ngayMuon;
    }

    public Instant getHanTra() {
        return this.hanTra;
    }

    public Muonsach hanTra(Instant hanTra) {
        this.setHanTra(hanTra);
        return this;
    }

    public void setHanTra(Instant hanTra) {
        this.hanTra = hanTra;
    }

    public Instant getNgayTra() {
        return this.ngayTra;
    }

    public Muonsach ngayTra(Instant ngayTra) {
        this.setNgayTra(ngayTra);
        return this;
    }

    public void setNgayTra(Instant ngayTra) {
        this.ngayTra = ngayTra;
    }

    public Integer getTrangThai() {
        return this.trangThai;
    }

    public Muonsach trangThai(Integer trangThai) {
        this.setTrangThai(trangThai);
        return this;
    }

    public void setTrangThai(Integer trangThai) {
        this.trangThai = trangThai;
    }

    public Docgia getDocgia() {
        return this.docgia;
    }

    public void setDocgia(Docgia docgia) {
        this.docgia = docgia;
    }

    public Muonsach docgia(Docgia docgia) {
        this.setDocgia(docgia);
        return this;
    }

    public Cuonsach getCuonsach() {
        return this.cuonsach;
    }

    public void setCuonsach(Cuonsach cuonsach) {
        this.cuonsach = cuonsach;
    }

    public Muonsach cuonsach(Cuonsach cuonsach) {
        this.setCuonsach(cuonsach);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Muonsach)) {
            return false;
        }
        return id != null && id.equals(((Muonsach) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Muonsach{" +
            "id=" + getId() +
            ", ngayMuon='" + getNgayMuon() + "'" +
            ", hanTra='" + getHanTra() + "'" +
            ", ngayTra='" + getNgayTra() + "'" +
            ", trangThai=" + getTrangThai() +
            "}";
    }
}
