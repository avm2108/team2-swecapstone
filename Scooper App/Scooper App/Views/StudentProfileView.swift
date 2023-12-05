//
//  StudentProfileView.swift
//  Scooper App
//
//  Created by Ryheem Heard on 11/28/23.
//

import SwiftUI

struct StudentProfileView: View {
    
    @StateObject private var vm: ScooperViewModel = ScooperViewModel()
    
    var body: some View {
        List {
            ForEach(vm.students) { student in
                
                
                NavigationLink {
                    ProfileView(name: student.name, dob: student.birth, parent: student.guardian.name, address: student.address, relation: student.guardian.relation, email: student.guardian.email, phone: student.guardian.phone, id: student.id)
                } label: {
                    HStack {
                        Circle()
                            .frame(width: 40, height: 40)
                            .foregroundStyle(Color.blue)
                        VStack(alignment: .leading) {
                            HStack {
                                Text(student.name )
                                    .font(.headline)
                            }
                            Text(student.scooper )
                                .font(.subheadline)
                                .foregroundStyle(Color.gray.opacity(0.4))
                        }
                        Spacer()
                    }
                }
            }
        }
        .onAppear(perform: {
            Task {
                try await vm.getStudents()
            }
        })
    }
}

#Preview {
    StudentProfileView()
}
