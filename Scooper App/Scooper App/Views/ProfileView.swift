//
//  ProfileView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/28/23.
//

import SwiftUI

struct ProfileView: View {
    
    @State var name: String?
    @State var dob: String?
    @State var parent: String?
    @State var address: Address?
    @State var relation: String?
    @State var email: String?
    @State var phone: String?
    @State var id: String?
    @StateObject private var vm = ScooperViewModel()
    @Environment(\.dismiss) var dismiss
    
    var body: some View {
        ScrollView(.vertical) {
            Text(name ?? "")
                .font(.largeTitle.bold())
            Text("D.O.B: \(dob ?? "")")
                .font(.title3)
                .foregroundStyle(.gray.opacity(0.7))
                .padding(.bottom)
            
            
            VStack(alignment: .leading) {
                Text("Parent Details")
                    .font(.title).bold()
                    .padding(.bottom)
                
                Text(self.parent ?? "")
                    .font(.title2)
                
                Text(self.relation ?? "")
                    .font(.caption)
                    .foregroundStyle(.gray)
                    .padding(.bottom)
                
                Text("Email: \(self.email ?? "")")
                Text("Phone: \(self.phone ?? "")")
                    .padding(.bottom)
                
                HStack(spacing: 0) {
                    Text("\(self.address?.address ?? "") ")
                        .lineLimit(1)
                    Text("\(self.address?.city ?? "")")
                    Text(", \(self.address?.state ?? "") ")
                    Text("\(self.address?.zipCode ?? "") ")
                }
                .foregroundStyle(.blue)
                
                Spacer()
            }
            .padding()
            .frame(width: 400, height: 400, alignment: .leading)
            .background {
                Color.gray.opacity(0.1)
            }
            
            Spacer()
            Button {
                vm.dismiss(status: true, id: id ?? "", position: 1000)
            } label: {
                Text("Mark Present")
            }
            .font(.headline)
            .frame(height: 55)
            .frame(minWidth: 360)
            .foregroundColor(.white)
            .background(Color("scooperGreen"))
            .clipShape(Rectangle())
            .cornerRadius(10)
        }
        .toolbar(content: {
            EditButton()
        })
    }
}

#Preview {
    ProfileView(name: "John Doe", dob: "01/01/1999", parent: "Jane Doe", address: Address(address: "1000 Chastain RD NW", city: "Kennesaw", state: "Ga", zipCode: "30144", type: "APT B"), relation: "Mother", email: "johndoe@test.com", phone: "404-340-5042")
}
